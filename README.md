### Customer Vaulted Payment Methods Admin Block Extension (WIP)

This is a simple Shopify Admin Block extension that displays and manages a customer’s vaulted payment methods directly on the Customer Details page. It requires the “read_customer_payment_methods” and “write_customer_payment_methods” access scopes.

![Screenshot of the Admin Block Extension](https://screenshot.click/03-08-5qj9f-3hss5.png)

## Features

- Lists all available payment methods for a given customer.
- Allows revoking existing payment methods (e.g., credit cards, PayPal, Shop Pay).
- Displays essential payment method details such as brand, masked number, and expiry date.

## Requirements

- A Shopify app (extension-only or hybrid) with the following access scopes in its app configuration:
  - `read_customer_payment_methods`
  - `write_customer_payment_methods`
- Node.js & npm (or Yarn) for local development.

## Installation

1. Clone or download this repository within your Shopify app project.
2. Install dependencies:
   ```
   yarn
   ```
3. Register the extension in your app’s configuration file (e.g., shopify.app.toml or shopify.extensions.toml).
4. Deploy your app according to Shopify’s recommended process (e.g., using the Shopify CLI).

## File Overview

- index.jsx (or .js): Main extension file that renders a block on the Shopify Admin’s Customer Details page.
- utils.js: Contains helper functions for fetching and revoking payment methods using Shopify’s GraphQL API.

## Usage

- Once deployed, navigate to the Customers section in Shopify Admin.
- Select a customer.
- The “Customer vaulted payment methods” block will appear, listing all available payment methods.
- You can revoke a payment method by clicking the delete button if revoking is allowed.

## Contributing / Feedback

Feel free to open issues or pull requests to discuss, fix bugs, or suggest enhancements.
This project is still in progress, so feedback is always welcome.

## License

MIT License. Refer to the LICENSE file for details.
