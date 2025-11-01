#!/usr/bin/env node

/**
 * Positioning Statement Generator CLI
 * Interactive prompts for April Dunford's framework
 */

const inquirer = require('inquirer');
const chalk = require('chalk');
const PositioningEngine = require('./positioning');
const OutputFormatter = require('./formatter');

async function run() {
  console.log(chalk.cyan.bold('\n🎯 POSITIONING STATEMENT GENERATOR'));
  console.log(chalk.gray('Based on April Dunford\'s "Obviously Awesome" framework\n'));

  const engine = new PositioningEngine();

  try {
    // Step 1: Product Name
    const { productName } = await inquirer.prompt([
      {
        type: 'input',
        name: 'productName',
        message: '📦 What\'s your product name?',
        validate: (input) => input.length > 0 || 'Product name is required',
      },
    ]);
    engine.setProductName(productName);

    console.log(chalk.green('\n✓ Product name set\n'));

    // Step 2: Competitive Alternatives
    console.log(chalk.cyan.bold('Step 1: Competitive Alternatives'));
    console.log(chalk.gray('What would customers use if you didn\'t exist?\n'));

    const { alternatives } = await inquirer.prompt([
      {
        type: 'input',
        name: 'alternatives',
        message: '🔄 List competitive alternatives (comma-separated):',
        validate: (input) => input.length > 0 || 'At least one alternative is required',
        filter: (input) => input.split(',').map(s => s.trim()),
      },
    ]);
    engine.addCompetitiveAlternatives(alternatives);

    console.log(chalk.green('\n✓ Competitive alternatives captured\n'));

    // Step 3: Unique Attributes
    console.log(chalk.cyan.bold('Step 2: Unique Attributes'));
    console.log(chalk.gray('What features/capabilities do you have that alternatives don\'t?\n'));

    const { attributes } = await inquirer.prompt([
      {
        type: 'input',
        name: 'attributes',
        message: '⭐ List unique attributes (comma-separated):',
        validate: (input) => input.length > 0 || 'At least one attribute is required',
        filter: (input) => input.split(',').map(s => s.trim()),
      },
    ]);
    engine.addUniqueAttributes(attributes);

    console.log(chalk.green('\n✓ Unique attributes captured\n'));

    // Step 4: Value Themes
    console.log(chalk.cyan.bold('Step 3: Value Themes'));
    console.log(chalk.gray('What value do those unique attributes enable?\n'));

    const { values } = await inquirer.prompt([
      {
        type: 'input',
        name: 'values',
        message: '💎 List value themes (comma-separated):',
        validate: (input) => input.length > 0 || 'At least one value theme is required',
        filter: (input) => input.split(',').map(s => s.trim()),
      },
    ]);
    engine.addValueThemes(values);

    console.log(chalk.green('\n✓ Value themes captured\n'));

    // Step 5: Target Market
    console.log(chalk.cyan.bold('Step 4: Target Market'));
    console.log(chalk.gray('Who cares most about this value?\n'));

    const { market } = await inquirer.prompt([
      {
        type: 'input',
        name: 'market',
        message: '🎯 Describe your target market:',
        validate: (input) => input.length > 0 || 'Target market is required',
      },
    ]);
    engine.setTargetMarket(market);

    console.log(chalk.green('\n✓ Target market captured\n'));

    // Step 6: Market Category
    console.log(chalk.cyan.bold('Step 5: Market Category'));
    console.log(chalk.gray('What market category makes your value obvious?\n'));

    const { category } = await inquirer.prompt([
      {
        type: 'input',
        name: 'category',
        message: '📊 What market category are you in?',
        validate: (input) => input.length > 0 || 'Market category is required',
      },
    ]);
    engine.setMarketCategory(category);

    console.log(chalk.green('\n✓ Market category captured\n'));

    // Generate positioning document
    console.log(chalk.cyan.bold('\n🎉 Generating your positioning statement...\n'));

    const document = engine.getCompleteDocument();

    // Display output
    const formatter = new OutputFormatter(document);
    console.log(formatter.formatCLI());

    // Ask for export
    const { exportFormat } = await inquirer.prompt([
      {
        type: 'list',
        name: 'exportFormat',
        message: '💾 Export your positioning document?',
        choices: [
          { name: 'Markdown (.md)', value: 'markdown' },
          { name: 'Text (.txt)', value: 'text' },
          { name: 'JSON (.json)', value: 'json' },
          { name: 'Skip export', value: 'none' },
        ],
      },
    ]);

    if (exportFormat !== 'none') {
      const filename = formatter.export(exportFormat);
      console.log(chalk.green(`\n✓ Saved to ${filename}\n`));
    }

    console.log(chalk.cyan('\n🚀 Your positioning is ready! Go nail that messaging.\n'));
  } catch (error) {
    if (error.isTtyError) {
      console.error(chalk.red('\nPrompt couldn\'t be rendered in the current environment'));
    } else {
      console.error(chalk.red('\n❌ Error:'), error.message);
    }
    process.exit(1);
  }
}

run();
