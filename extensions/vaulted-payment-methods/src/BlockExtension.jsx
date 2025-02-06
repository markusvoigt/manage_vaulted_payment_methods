import {
  reactExtension,
  useApi,
  AdminBlock,
  InlineStack,
  Text,
  ProgressIndicator,
  Box,
  Divider,
  Button,
  Icon
} from '@shopify/ui-extensions-react/admin';
import { useEffect, useState } from "react";
import { getPaymentMethods, revokePaymentMethod } from "./utils";


const TARGET = 'admin.customer-details.block.render';

export default reactExtension(TARGET, () => <App />);

function App() {

  const {i18n, data} = useApi(TARGET);
  const customerID=data.selected[0].id;

  const [loading, setLoading] = useState(true);
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    (async function getCustomerPaymentMethods() {
      const paymentMethods = await getPaymentMethods(customerID);
      setLoading(false);
      if (paymentMethods?.data?.customer?.paymentMethods?.edges) {
        setPaymentMethods(paymentMethods?.data?.customer?.paymentMethods?.edges.map((node)=>node.node));
      }
    })();
  }, [customerID]);

  const handleRevoke = async (id) => {
    setPaymentMethods(paymentMethods.filter((paymentMethod) => paymentMethod.id !== id));
    await revokePaymentMethod(id);
  };

    return loading ? (
      <InlineStack blockAlignment='center' inlineAlignment='center'>
        <ProgressIndicator size="large-100" />
      </InlineStack>
    ) : (
    <AdminBlock title="Customer vaulted payment methods">
        {paymentMethods.length ?  (
          <>
          <Box paddingBlockEnd="large">
          <Text fontWeight="bold">Payment methods on file:</Text>
        </Box>
          {paymentMethods.map(
              ({ id, instrument }, index) => {
                 const type = ()=>{
                  if (instrument.brand) return "Credit Card"
                 else if (instrument.paypayAccountEmail) return "PayPal"
                 else return "ShopPay"
                 }
                 const details = ()=>{
                  if (type()=="Credit Card") return `${instrument.brand.capitalize()}: ${instrument.name}, ${instrument.maskedNumber}`
                 else if (type()=="PayPal") return `${paypayAccountEmail}`
                 else return `${instrument.name}, ${instrument.maskedNumber}`
                 }
                 const expiryDate = ()=>{
                  if (type()=="Credit Card") return `${instrument.expiryYear}, ${instrument.expiryMonth}`
                 else if (type()=="PayPal") return `Never`
                 else return `${instrument.expiryYear}, ${instrument.expiryMonth}`
                 }

                return (
                  <>
                    {index > 0 && <Divider />}
                    <Box key={id} padding="base small">
                    <InlineStack
                        blockAlignment="center"
                        inlineSize="100%"
                        gap="large"
                      >
                        <Box inlineSize="60%">
                          <Box inlineSize="100%">
                            <Text fontWeight="bold" textOverflow="ellipsis">{type()}</Text>
                          </Box>

                          <Box inlineSize="100%">
                            <Text textOverflow="ellipsis">{details()}</Text>
                          </Box>
                        </Box>
                        <Box inlineSize="25%">
                        <Box inlineSize="100%">
                            <Text fontWeight="bold" textOverflow="ellipsis">Expires:</Text>
                            <Box inlineSize="100%">
                            <Text textOverflow="ellipsis">{expiryDate()}</Text>
                          </Box>
                          </Box>
                        </Box>
                        <Box inlineSize="15%">
                            <Button
                              onPress={() => handleRevoke(id)}
                              variant="plain"
                              tone="critical"
                              disabled={!instrument.isRevocable}
                            >
                              Revoke
                            </Button>
                        </Box>
                      </InlineStack>
                    </Box>
                    </> )
              })}
            
          </>
      ): ( 
        <>
            <Box paddingBlockEnd="large">
              <Text fontWeight="bold">No payment methods on file.</Text>
            </Box>
          </>
       )}
    </AdminBlock>
  );
}



Object.defineProperty(String.prototype, "capitalize", {
  value: function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false,
});