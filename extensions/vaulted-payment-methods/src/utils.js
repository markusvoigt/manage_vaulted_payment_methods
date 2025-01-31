async function makeGraphQLQuery(query, variables) {
  const graphQLQuery = {
    query,
    variables,
  };

  const res = await fetch("shopify:admin/api/graphql.json", {
    method: "POST",
    body: JSON.stringify(graphQLQuery),
  });

  if (!res.ok) {
    console.error("Network error");
  }

  return await res.json();
}

export async function getPaymentMethods(customerId) {
  return await makeGraphQLQuery(
    `query Customer($id: ID!) {
        customer(id: $id) {
          paymentMethods(first:10){
          edges{
          node{
          id,
          instrument{
          __typename,
          ... on CustomerCreditCard{
          brand,
          name,
          maskedNumber,
          name,
          expiryMonth,
          expiryYear,
          isRevocable
          }
          ... on CustomerPaypalBillingAgreement{
            paypalAccountEmail,
            isRevocable
          }
            ... on CustomerShopPayAgreement{
            name,
            maskedNumber,
            expiryMonth,
            expiryYear,
            isRevocable
          }
          }
          }}}
        }
      }
    `,
    { id: customerId }
  );
}

export async function revokePaymentMethod(paymentMethodId) {
  return await makeGraphQLQuery(
    `mutation customerPaymentMethodRevoke($customerPaymentMethodId: ID!) {
  customerPaymentMethodRevoke(customerPaymentMethodId: $customerPaymentMethodId) {
    revokedCustomerPaymentMethodId
    userErrors {
      field
      message
    }
  }
}
      `,
    {
      customerPaymentMethodId: paymentMethodId,
    }
  );
}
