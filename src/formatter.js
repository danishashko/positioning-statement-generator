/**
 * Output Formatter - Beautiful CLI output and export formats
 */

const chalk = require('chalk');
const Table = require('cli-table3');
const fs = require('fs');
const path = require('path');

class OutputFormatter {
  constructor(document) {
    this.doc = document;
  }

  /**
   * Format for CLI display
   */
  formatCLI() {
    const lines = [];

    lines.push(chalk.cyan('═'.repeat(70)));
    lines.push(chalk.bold.cyan('           POSITIONING STATEMENT           '));
    lines.push(chalk.cyan('═'.repeat(70)));
    lines.push('');

    // Product Name
    lines.push(chalk.bold.white(`📦 ${this.doc.productName}`));
    lines.push('');

    // Core Positioning Statement
    lines.push(chalk.bold.yellow('🎯 Core Positioning Statement:'));
    lines.push(chalk.white(this.wrapText(this.doc.positioningStatement, 65)));
    lines.push('');

    // Elevator Pitches
    lines.push(chalk.bold.green('⏱️  30-Second Elevator Pitch:'));
    lines.push(chalk.white(this.wrapText(this.doc.elevatorPitch30, 65)));
    lines.push('');

    lines.push(chalk.bold.green('⏱️  2-Minute Elevator Pitch:'));
    this.doc.elevatorPitch2Min.split('\n').forEach(line => {
      lines.push(chalk.white(this.wrapText(line.trim(), 65)));
    });
    lines.push('');

    // Hero Copy
    lines.push(chalk.bold.magenta('🌟 Website Hero Copy:'));
    lines.push(chalk.white(`  Headline: ${this.doc.heroCopy.headline}`));
    lines.push(chalk.white(`  Subheadline: ${this.doc.heroCopy.subheadline}`));
    lines.push(chalk.white(`  CTA: ${this.doc.heroCopy.cta}`));
    lines.push('');

    // Competitive Matrix
    lines.push(chalk.bold.blue('📊 Competitive Positioning Matrix:'));
    const table = new Table({
      head: this.doc.competitiveMatrix.headers.map(h => chalk.bold(h)),
      style: { head: [], border: ['gray'] },
    });

    this.doc.competitiveMatrix.rows.forEach(row => {
      table.push(row);
    });
    lines.push(table.toString());
    lines.push('');

    // Messaging Hierarchy
    lines.push(chalk.bold.cyan('🏗️  Messaging Hierarchy:'));
    lines.push(chalk.white(`  Top-Level Narrative: ${this.doc.messagingHierarchy.topLevel}`));
    lines.push(chalk.white('  Pillar Messages:'));
    this.doc.messagingHierarchy.pillars.forEach((pillar, i) => {
      lines.push(chalk.white(`    ${i + 1}. ${pillar}`));
    });
    lines.push(chalk.white('  Proof Points:'));
    this.doc.messagingHierarchy.proofPoints.forEach((point, i) => {
      lines.push(chalk.white(`    ${i + 1}. ${point}`));
    });
    lines.push('');

    lines.push(chalk.cyan('═'.repeat(70)));

    return lines.join('\n');
  }

  /**
   * Export to Markdown
   */
  exportMarkdown() {
    const md = [];

    md.push(`# ${this.doc.productName} - Positioning Statement`);
    md.push('');
    md.push('> Generated with [positioning-statement-generator](https://www.npmjs.com/package/positioning-statement-generator)');
    md.push('> Based on April Dunford\'s "Obviously Awesome" framework');
    md.push('');

    md.push('## 🎯 Core Positioning Statement');
    md.push('');
    md.push(this.doc.positioningStatement);
    md.push('');

    md.push('## ⏱️ Elevator Pitches');
    md.push('');
    md.push('### 30-Second Version');
    md.push('');
    md.push(this.doc.elevatorPitch30);
    md.push('');

    md.push('### 2-Minute Version');
    md.push('');
    md.push(this.doc.elevatorPitch2Min);
    md.push('');

    md.push('## 🌟 Website Hero Copy');
    md.push('');
    md.push(`**Headline:** ${this.doc.heroCopy.headline}`);
    md.push('');
    md.push(`**Subheadline:** ${this.doc.heroCopy.subheadline}`);
    md.push('');
    md.push(`**CTA:** ${this.doc.heroCopy.cta}`);
    md.push('');

    md.push('## 📊 Competitive Positioning Matrix');
    md.push('');
    md.push(`| Feature | ${this.doc.competitiveMatrix.headers.slice(1).join(' | ')} |`);
    md.push(`| --- | ${this.doc.competitiveMatrix.headers.slice(1).map(() => '---').join(' | ')} |`);
    this.doc.competitiveMatrix.rows.forEach(row => {
      md.push(`| ${row.join(' | ')} |`);
    });
    md.push('');

    md.push('## 🏗️ Messaging Hierarchy');
    md.push('');
    md.push(`**Top-Level Narrative:** ${this.doc.messagingHierarchy.topLevel}`);
    md.push('');
    md.push('**Pillar Messages:**');
    this.doc.messagingHierarchy.pillars.forEach((pillar, i) => {
      md.push(`${i + 1}. ${pillar}`);
    });
    md.push('');
    md.push('**Proof Points:**');
    this.doc.messagingHierarchy.proofPoints.forEach((point, i) => {
      md.push(`${i + 1}. ${point}`);
    });
    md.push('');

    md.push('---');
    md.push('');
    md.push('## 📋 Raw Framework Data');
    md.push('');
    md.push('**Competitive Alternatives:**');
    this.doc.rawData.competitiveAlternatives.forEach(alt => {
      md.push(`- ${alt}`);
    });
    md.push('');

    md.push('**Unique Attributes:**');
    this.doc.rawData.uniqueAttributes.forEach(attr => {
      md.push(`- ${attr}`);
    });
    md.push('');

    md.push('**Value Themes:**');
    this.doc.rawData.valueThemes.forEach(value => {
      md.push(`- ${value}`);
    });
    md.push('');

    md.push(`**Target Market:** ${this.doc.rawData.targetMarket}`);
    md.push('');
    md.push(`**Market Category:** ${this.doc.rawData.marketCategory}`);

    return md.join('\n');
  }

  /**
   * Export to text
   */
  exportText() {
    // Strip ANSI codes from CLI output
    return this.formatCLI().replace(/\u001b\[\d+m/g, '');
  }

  /**
   * Export to JSON
   */
  exportJSON() {
    return JSON.stringify(this.doc, null, 2);
  }

  /**
   * Export to file
   */
  export(format) {
    const timestamp = new Date().toISOString().split('T')[0];
    const sanitizedName = this.doc.productName.toLowerCase().replace(/\s+/g, '-');
    let filename, content;

    switch (format) {
      case 'markdown':
        filename = `positioning-${sanitizedName}-${timestamp}.md`;
        content = this.exportMarkdown();
        break;
      case 'text':
        filename = `positioning-${sanitizedName}-${timestamp}.txt`;
        content = this.exportText();
        break;
      case 'json':
        filename = `positioning-${sanitizedName}-${timestamp}.json`;
        content = this.exportJSON();
        break;
      default:
        throw new Error(`Unknown format: ${format}`);
    }

    fs.writeFileSync(filename, content);
    return filename;
  }

  /**
   * Wrap text to specified width
   */
  wrapText(text, width) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    words.forEach(word => {
      if ((currentLine + word).length <= width) {
        currentLine += (currentLine ? ' ' : '') + word;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    });

    if (currentLine) lines.push(currentLine);

    return lines.join('\n');
  }
}

module.exports = OutputFormatter;
