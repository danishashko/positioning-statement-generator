/**
 * Test script for positioning engine (non-interactive)
 */

const PositioningEngine = require('./src/positioning');
const OutputFormatter = require('./src/formatter');

console.log('Testing Positioning Statement Generator...\n');

// Create engine
const engine = new PositioningEngine();

// Populate with test data
engine.setProductName('Acme Analytics');
engine.addCompetitiveAlternatives(['Excel', 'Google Sheets', 'hiring a data analyst']);
engine.addUniqueAttributes(['real-time dashboards', 'no-code setup', 'AI-powered insights']);
engine.addValueThemes(['make data-driven decisions faster', 'reduce analytics costs by 80%', 'empower non-technical teams']);
engine.setTargetMarket('B2B SaaS companies with 10-100 employees');
engine.setMarketCategory('business intelligence platform');

// Generate document
const document = engine.getCompleteDocument();

// Format and display
const formatter = new OutputFormatter(document);
console.log(formatter.formatCLI());

// Test export
console.log('\nTesting exports...');
const mdFile = formatter.export('markdown');
console.log(`✓ Markdown exported to: ${mdFile}`);

const txtFile = formatter.export('text');
console.log(`✓ Text exported to: ${txtFile}`);

const jsonFile = formatter.export('json');
console.log(`✓ JSON exported to: ${jsonFile}`);

console.log('\n✅ All tests passed!');
