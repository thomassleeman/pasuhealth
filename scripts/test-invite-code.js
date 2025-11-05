#!/usr/bin/env node

/**
 * Test script to verify invite code generation and validation
 * Run with: node scripts/test-invite-code.js
 */

require('dotenv').config({ path: '.env.local' });

// Import from the compiled TypeScript files (you may need to run build first)
// Or we can use ts-node if available

const { generateInviteCode, validateInviteCode } = require('../lib/partnerInviteCode');

const testEmail = 'test@example.com';
const daysValid = 7;

console.log('Testing Invite Code System');
console.log('===========================\n');

// Check if secret is defined
if (!process.env.PARTNER_INVITE_SECRET) {
  console.error('❌ PARTNER_INVITE_SECRET is not set!');
  process.exit(1);
}

console.log('✓ PARTNER_INVITE_SECRET is set');
console.log(`  Length: ${process.env.PARTNER_INVITE_SECRET.length} characters\n`);

// Test 1: Generate a code
console.log('Test 1: Generating invite code');
console.log('-------------------------------');
try {
  const inviteCode = generateInviteCode(testEmail, daysValid);
  console.log(`✓ Generated code: ${inviteCode}\n`);

  // Test 2: Validate with correct email
  console.log('Test 2: Validating with correct email');
  console.log('--------------------------------------');
  const validation1 = validateInviteCode(inviteCode, testEmail);
  console.log(`Result: ${validation1.valid ? '✓ VALID' : '❌ INVALID'}`);
  if (!validation1.valid) {
    console.log(`Error: ${validation1.error}`);
  }
  console.log();

  // Test 3: Validate with wrong email
  console.log('Test 3: Validating with wrong email');
  console.log('------------------------------------');
  const validation2 = validateInviteCode(inviteCode, 'wrong@example.com');
  console.log(`Result: ${validation2.valid ? '❌ SHOULD BE INVALID' : '✓ Correctly rejected'}`);
  if (!validation2.valid) {
    console.log(`Error: ${validation2.error}`);
  }
  console.log();

  // Test 4: Validate with code without dashes
  console.log('Test 4: Validating code without dashes');
  console.log('---------------------------------------');
  const codeNoDashes = inviteCode.replace(/-/g, '');
  const validation3 = validateInviteCode(codeNoDashes, testEmail);
  console.log(`Result: ${validation3.valid ? '✓ VALID' : '❌ INVALID'}`);
  if (!validation3.valid) {
    console.log(`Error: ${validation3.error}`);
  }
  console.log();

  // Test 5: Validate with uppercase code
  console.log('Test 5: Validating uppercase code');
  console.log('----------------------------------');
  const uppercaseCode = inviteCode.toUpperCase();
  const validation4 = validateInviteCode(uppercaseCode, testEmail);
  console.log(`Result: ${validation4.valid ? '✓ VALID' : '❌ INVALID'}`);
  if (!validation4.valid) {
    console.log(`Error: ${validation4.error}`);
  }
  console.log();

} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}

console.log('\n✓ All tests completed');
