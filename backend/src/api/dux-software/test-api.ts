/**
 * Dux Software API Testing Script
 * Use this script to discover the exact API requirements and field names
 *
 * Run with: cd backend && npx ts-node src/api/dux-software/test-api.ts
 */

// Load environment variables from .env file
import { config as loadEnv } from 'dotenv';
loadEnv();

import { loadDuxConfig } from './utils/auth';
import { createDuxClient } from './utils/client';

/**
 * Test 1: Minimal Invoice Creation
 * Discover required fields through validation errors
 */
async function testMinimalInvoice() {
  console.log('\n=== Test 1: Minimal Invoice Creation ===\n');

  try {
    const config = loadDuxConfig();
    const client = createDuxClient(config);

    const minimalPayload = {
      // Start with empty object and add fields based on errors
    };

    const response = await client.post('/factura/nuevaFactura', minimalPayload);

    console.log('✅ Success with minimal payload!');
    console.log('Response:', JSON.stringify(response.data, null, 2));
  } catch (error: any) {
    console.log('❌ Error (expected - helps discover required fields):');
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Error data:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.log('Error:', error.message);
    }
  }
}

/**
 * Test 2: Invoice with Customer Data
 * Test customer field requirements
 */
async function testInvoiceWithCustomer() {
  console.log('\n=== Test 2: Invoice with Customer Data ===\n');

  try {
    const config = loadDuxConfig();
    const client = createDuxClient(config);

    const payload = {
      cliente: {
        nombre: 'Juan Pérez',
        email: 'juan.perez@example.com',
        telefono: '381-1234567',
        // Add more fields as discovered
      },
      // Add other fields as discovered
    };

    const response = await client.post('/factura/nuevaFactura', payload);

    console.log('✅ Success!');
    console.log('Response:', JSON.stringify(response.data, null, 2));
  } catch (error: any) {
    console.log('❌ Error:');
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Error data:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.log('Error:', error.message);
    }
  }
}

/**
 * Test 3: Complete Invoice
 * Test with full order data including items
 */
async function testCompleteInvoice() {
  console.log('\n=== Test 3: Complete Invoice ===\n');

  try {
    const config = loadDuxConfig();
    const client = createDuxClient(config);

    const payload = {
      cliente: {
        nombre: 'María González',
        email: 'maria.gonzalez@example.com',
        telefono: '381-7654321',
        // Add more customer fields as needed
      },
      items: [
        {
          descripcion: 'Colchón Queen Size Premium',
          cantidad: 1,
          precioUnitario: 150000,
          iva: 21,
        },
        {
          descripcion: 'Almohada Memory Foam',
          cantidad: 2,
          precioUnitario: 25000,
          iva: 21,
        },
      ],
      // Add payment info, reference, etc. as discovered
      referencia: `TEST-${Date.now()}`,
      montoTotal: 242000,
      metodoPago: 'credit_card',
    };

    const response = await client.post('/factura/nuevaFactura', payload);

    console.log('✅ Success!');
    console.log('Response:', JSON.stringify(response.data, null, 2));

    // Try to identify invoice ID field
    console.log('\n📋 Possible Invoice ID fields:');
    const data = response.data;
    if (data.id) console.log('  - id:', data.id);
    if (data.invoiceId) console.log('  - invoiceId:', data.invoiceId);
    if (data.facturaId) console.log('  - facturaId:', data.facturaId);
    if (data.numeroFactura) console.log('  - numeroFactura:', data.numeroFactura);
    if (data.invoice_id) console.log('  - invoice_id:', data.invoice_id);
  } catch (error: any) {
    console.log('❌ Error:');
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Error data:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.log('Error:', error.message);
    }
  }
}

/**
 * Test 4: Get Invoice Status
 * Test the status endpoint
 */
async function testGetInvoiceStatus() {
  console.log('\n=== Test 4: Get Invoice Status ===\n');

  try {
    const config = loadDuxConfig();
    const client = createDuxClient(config);

    // Replace with actual invoice ID from previous test
    const testInvoiceId = '12345';

    const response = await client.get('/obtenerEstadoFactura', {
      params: { invoiceId: testInvoiceId },
    });

    console.log('✅ Success!');
    console.log('Response:', JSON.stringify(response.data, null, 2));
  } catch (error: any) {
    console.log('❌ Error (expected if invoice ID is invalid):');
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Error data:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.log('Error:', error.message);
    }
  }
}

/**
 * Test 5: List Invoices
 * Test listing invoices to understand response format
 */
async function testListInvoices() {
  console.log('\n=== Test 5: List Invoices ===\n');

  try {
    const config = loadDuxConfig();
    const client = createDuxClient(config);

    const response = await client.get('/facturas');

    console.log('✅ Success!');
    console.log('Response:', JSON.stringify(response.data, null, 2));

    // Analyze structure
    if (Array.isArray(response.data)) {
      console.log(`\n📊 Found ${response.data.length} invoices`);
      if (response.data.length > 0) {
        console.log('\nFirst invoice structure:');
        console.log(JSON.stringify(response.data[0], null, 2));
      }
    }
  } catch (error: any) {
    console.log('❌ Error:');
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Error data:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.log('Error:', error.message);
    }
  }
}

/**
 * Test 6: Test Authentication
 * Verify authentication works
 */
async function testAuthentication() {
  console.log('\n=== Test 6: Authentication Test ===\n');

  try {
    const config = loadDuxConfig();
    console.log('Config loaded:');
    console.log('  - Base URL:', config.baseUrl);
    console.log('  - Token:', config.apiToken.substring(0, 20) + '...');
    console.log('  - Environment:', config.environment);
    console.log('  - Timeout:', config.timeout, 'ms');

    // Try different authentication header patterns
    const testHeaders: Record<string, string>[] = [
      { 'Content-Type': 'application/json', Authorization: `Bearer ${config.apiToken}` },
      { 'Content-Type': 'application/json', 'X-API-Token': config.apiToken },
      { 'Content-Type': 'application/json', 'X-Auth-Token': config.apiToken },
      { 'Content-Type': 'application/json', token: config.apiToken },
      { 'Content-Type': 'application/json', 'api-token': config.apiToken },
    ];

    for (const headers of testHeaders) {
      const authHeaderName = Object.keys(headers).find(k => k !== 'Content-Type') || 'unknown';
      console.log('\nTrying header:', authHeaderName);
      try {
        const url = `${config.baseUrl}/facturas`;
        const response = await fetch(url, {
          method: 'GET',
          headers,
        });

        if (response.ok) {
          console.log('✅ Success with these headers!');
          console.log('Headers that worked:', JSON.stringify(headers, null, 2));
          break;
        } else if (response.status === 401 || response.status === 403) {
          console.log('❌ Authentication failed with these headers');
        } else {
          console.log('⚠️  Other error (might be working):', response.status);
        }
      } catch (error: any) {
        console.log('⚠️  Request error:', error.message);
      }
    }
  } catch (error: any) {
    console.log('❌ Configuration error:');
    console.log(error.message);
  }
}

/**
 * Main test runner
 */
async function runTests() {
  console.log('🧪 Dux Software API Discovery Tests\n');
  console.log('='.repeat(60));

  // Run tests sequentially
  await testAuthentication();
  await testMinimalInvoice();
  await testInvoiceWithCustomer();
  await testCompleteInvoice();
  await testListInvoices();
  await testGetInvoiceStatus();

  console.log('\n' + '='.repeat(60));
  console.log('\n✨ Tests completed!\n');
  console.log('Next steps:');
  console.log('1. Review the error messages to identify required fields');
  console.log('2. Update schemas/validation.ts with discovered field names');
  console.log('3. Update utils/mapper.ts to map order data correctly');
  console.log('4. Update services/dux-software.ts to extract invoice ID correctly');
  console.log('5. Test with real MercadoPago payment\n');
}

// Run tests if executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

export {
  testMinimalInvoice,
  testInvoiceWithCustomer,
  testCompleteInvoice,
  testGetInvoiceStatus,
  testListInvoices,
  testAuthentication,
};
