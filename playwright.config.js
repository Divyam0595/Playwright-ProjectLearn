// @ts-check
import { defineConfig, devices, expect } from '@playwright/test';
import { trace } from 'console';
import { channel } from 'diagnostics_channel';

const config = {
  testDir: './tests',
  timeout: 80 * 1000,
  expect: {
    timeout: 5000,
  },
  use: {
    browserName: 'chromium',
    headless: false,
    channel: 'chrome',
    screenshot: 'on',
    trace:'on'
  },
  outputDir: 'test-results',
  reporter: 'html',
}
module.exports = config