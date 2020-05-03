/**
 * @flow
 */

const url = `http://ec2-52-63-127-15.ap-southeast-2.compute.amazonaws.com:4000/graphql/`;

module.exports = {
  client: {
    service: {
      url,
      name: "Issei",
      // headers: {
      //   authorization: `Bearer ${API_KEY}`,
      // },
    },
  },
};
