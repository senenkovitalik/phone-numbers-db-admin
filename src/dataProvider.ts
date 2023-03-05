import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { DataProvider } from "ra-core";
import { omit } from "lodash";

const apiUrl = "http://localhost:3001/graphql";

const client = new ApolloClient({
  uri: apiUrl,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "ignore",
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
  },
});

const fields: { [key: string]: string } = {
  humans: `
    id
    firstName
    middleName
    lastName
  `,
  subscribers: `
    id
    human {
      id
      firstName
      middleName
      lastName
    }
    locations {
      id
      name
      description
      country
      region
      district
      city
      street
      building
      section
      floor
      room
      parentId
    }
    position
    description
     `,
  communication_types: "id value description",
  communication_phone_numbers: `
    id
    value
    location {
      id
      name
    }
    communicationType {
      id
      value
    }
    subscriber {
      id
      firstName
      lastName
      middleName
    }`,
  locations: `
    id
    name
    description
    country
    region
    district
    city
    street
    building
    section
    floor
    room
    parentId
  `,
};

function isObject(val: unknown) {
  if (val === null) {
    return false;
  }
  if (typeof val === "function") return false;
  return typeof val === "object";
}

function changeFilter(obj: { [key: string]: any }) {
  const keys = Object.keys(obj);

  if (keys.length) {
    keys.forEach((key) => {
      if (isObject(obj[key])) {
        changeFilter(obj[key]);
      } else {
        const value = obj[key];

        if (Array.isArray(value)) {
          obj[key] = { _in: value };
        } else {
          obj[key] = { _eq: value };
        }
      }
    });
  }
}

export const dataProvider: DataProvider = {
  getList: (resource, { sort, pagination, filter }) => {
    const { field, order } = sort;
    const { page, perPage } = pagination;
    return client
      .query({
        query: gql`
          query ($limit: Int, $offset: Int, $order_by: Order!, $where: ${resource}_where_exp) {
            ${resource}(limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
              ${fields[resource]}
            }
            ${resource}_aggregate(where: $where) {
              aggregate {
                count
              }
            }
          }`,
        variables: {
          limit: perPage,
          offset: (page - 1) * perPage,
          order_by: { field: field, order: order.toLowerCase() },
          where: (() => {
            const copy = Object.assign({}, filter);

            changeFilter(copy);

            return copy;
          })(),
        },
      })
      .then((result) => ({
        data: result.data[resource],
        total: result.data[`${resource}_aggregate`].aggregate.count,
      }));
  },
  getOne: (resource, params) => {
    return client
      .query({
        query: gql`
            query ($id: Int!) {
                ${resource}_by_pk(id: $id) {
                    ${fields[resource]}
                }
            }`,
        variables: {
          id: parseInt(params.id),
        },
      })
      .then((result) => ({ data: result.data[`${resource}_by_pk`] }));
  },
  getMany: (resource, params) => {
    return client
      .query({
        query: gql`
            query ($where: ${resource}_where_exp) {
                ${resource}(where: $where) {
                    ${fields[resource]}
                }
            }`,
        variables: {
          where: {
            id: { _in: params.ids },
          },
        },
      })
      .then((result) => ({ data: result.data[resource] }));
  },
  getManyReference: (resource, { target, id, sort, pagination, filter }) => {
    const { field, order } = sort;
    const { page, perPage } = pagination;
    return client
      .query({
        query: gql`
            query ($limit: Int, $offset: Int, $order_by: [order!], $where: ${resource}_bool_exp) {
                ${resource}(limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
                    ${fields[resource]}
                }
                ${resource}_aggregate(where: $where) {
                    aggregate {
                        count
                    }
                }
            }`,
        variables: {
          limit: perPage,
          offset: (page - 1) * perPage,
          order_by: { [field]: order.toLowerCase() },
          where: Object.keys(filter).reduce(
            (prev, key) => ({
              ...prev,
              [key]: { _eq: filter[key] },
            }),
            { [target]: { _eq: id } }
          ),
        },
      })
      .then((result) => ({
        data: result.data[resource],
        total: result.data[`${resource}_aggregate`].aggregate.count,
      }));
  },
  create: (resource, params) => {
    return client
      .mutate({
        mutation: gql`
            mutation ($data: ${resource}_update_input!) {
                insert_${resource}_one(data: $data) {
                    ${fields[resource]}
                }
            }`,
        variables: {
          data: omit(params.data, ["__typename"]),
        },
      })
      .then((result) => ({
        data: result.data[`insert_${resource}_one`],
      }));
  },
  update: (resource, params) => {
    return client
      .mutate({
        mutation: gql`
          mutation ($id: Int!, $data: ${resource}_update_input!) {
            update_${resource}_by_pk(id: $id, data: $data) {
              ${fields[resource]}
            }
          }`,
        variables: {
          id: parseInt(params.id as string),
          data: omit(params.data, ["id", "__typename"]),
        },
      })
      .then((result) => ({
        data: result.data[`update_${resource}_by_pk`],
      }));
  },
  updateMany: (resource, params) => {
    return client
      .mutate({
        mutation: gql`
            mutation ($where: ${resource}_bool_exp!, $data: ${resource}_set_input!) {
                update_${resource}(where: $where, _set: $data) {
                    affected_rows
                }
            }`,
        variables: {
          where: {
            id: { _in: params.ids },
          },
          data: omit(params.data, ["__typename"]),
        },
      })
      .then((result) => ({
        data: params.ids,
      }));
  },
  delete: (resource, params) => {
    return client
      .mutate({
        mutation: gql`
            mutation ($id: Int!) {
                delete_${resource}_by_pk(id: $id) {
                    ${fields[resource]}
                }
            }`,
        variables: {
          id: params.id,
        },
      })
      .then((result) => ({
        data: result.data[`delete_${resource}_by_pk`],
      }));
  },
  deleteMany: (resource, params) => {
    return client
      .mutate({
        mutation: gql`
          mutation ($where: ${resource}_delete_input!) {
            delete_${resource}(where: $where) {
              affected_rows
            }
          }`,
        variables: {
          where: {
            ids: params.ids,
          },
        },
      })
      .then(() => ({
        data: params.ids,
      }));
  },
};
