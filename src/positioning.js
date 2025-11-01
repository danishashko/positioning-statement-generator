/**
 * Positioning Statement Generator - Core Logic
 * Based on April Dunford's "Obviously Awesome" Framework
 */

class PositioningEngine {
  constructor() {
    this.positioning = {
      productName: '',
      competitiveAlternatives: [],
      uniqueAttributes: [],
      valueThemes: [],
      targetMarket: '',
      marketCategory: '',
    };
  }

  /**
   * Set product name
   */
  setProductName(name) {
    this.positioning.productName = name;
  }

  /**
   * Add competitive alternatives (what customers use if you don't exist)
   */
  addCompetitiveAlternatives(alternatives) {
    this.positioning.competitiveAlternatives = alternatives;
  }

  /**
   * Add unique attributes (features you have that alternatives don't)
   */
  addUniqueAttributes(attributes) {
    this.positioning.uniqueAttributes = attributes;
  }

  /**
   * Add value themes (value enabled by unique attributes)
   */
  addValueThemes(themes) {
    this.positioning.valueThemes = themes;
  }

  /**
   * Set target market (who cares most about that value)
   */
  setTargetMarket(market) {
    this.positioning.targetMarket = market;
  }

  /**
   * Set market category (category that makes value obvious)
   */
  setMarketCategory(category) {
    this.positioning.marketCategory = category;
  }

  /**
   * Generate positioning statement
   */
  generatePositioningStatement() {
    const { productName, competitiveAlternatives, uniqueAttributes, valueThemes, targetMarket, marketCategory } = this.positioning;

    return `${productName} is a ${marketCategory} that helps ${targetMarket} ${valueThemes[0]}. Unlike ${competitiveAlternatives.join(', ')}, we ${uniqueAttributes[0]}.`;
  }

  /**
   * Generate elevator pitch (30 second version)
   */
  generateElevatorPitch30() {
    const { productName, targetMarket, valueThemes, marketCategory } = this.positioning;

    return `${productName} helps ${targetMarket} ${valueThemes[0]}. We're the only ${marketCategory} that ${this.positioning.uniqueAttributes[0]}.`;
  }

  /**
   * Generate elevator pitch (2 minute version)
   */
  generateElevatorPitch2Min() {
    const { productName, competitiveAlternatives, uniqueAttributes, valueThemes, targetMarket, marketCategory } = this.positioning;

    return `You know how ${targetMarket} struggle with ${this.inferProblem()}?

Most companies use ${competitiveAlternatives[0]}, but that approach has limitations.

${productName} is a ${marketCategory} that solves this differently. We ${uniqueAttributes.join(', and we ')}.

This means ${valueThemes.join(', ')}.

We're built specifically for ${targetMarket} who need ${valueThemes[0]}.`;
  }

  /**
   * Generate hero copy for website
   */
  generateHeroCopy() {
    const { productName, valueThemes, targetMarket } = this.positioning;

    const headline = `${valueThemes[0]} for ${targetMarket}`;
    const subheadline = `${productName} helps you ${valueThemes.slice(0, 3).join(', ')}`;
    const cta = 'Get Started';

    return {
      headline,
      subheadline,
      cta,
    };
  }

  /**
   * Generate competitive positioning matrix
   */
  generateCompetitiveMatrix() {
    const { productName, competitiveAlternatives, uniqueAttributes } = this.positioning;

    const matrix = {
      headers: ['Feature', productName, ...competitiveAlternatives.slice(0, 2)],
      rows: uniqueAttributes.map(attr => [
        attr,
        '✓',
        '✗',
        '✗',
      ]),
    };

    return matrix;
  }

  /**
   * Generate messaging hierarchy
   */
  generateMessagingHierarchy() {
    const { valueThemes, uniqueAttributes } = this.positioning;

    return {
      topLevel: valueThemes[0],
      pillars: valueThemes.slice(0, 3),
      proofPoints: uniqueAttributes,
    };
  }

  /**
   * Infer problem from competitive alternatives
   */
  inferProblem() {
    const { competitiveAlternatives } = this.positioning;

    if (competitiveAlternatives.includes('spreadsheets') || competitiveAlternatives.includes('Excel')) {
      return 'manual, error-prone processes';
    }
    if (competitiveAlternatives.includes('email') || competitiveAlternatives.includes('Slack')) {
      return 'scattered, unorganized communication';
    }
    if (competitiveAlternatives.includes('nothing')) {
      return 'this problem without any solution';
    }

    return `inefficient workflows using ${competitiveAlternatives[0]}`;
  }

  /**
   * Get complete positioning document
   */
  getCompleteDocument() {
    return {
      productName: this.positioning.productName,
      positioningStatement: this.generatePositioningStatement(),
      elevatorPitch30: this.generateElevatorPitch30(),
      elevatorPitch2Min: this.generateElevatorPitch2Min(),
      heroCopy: this.generateHeroCopy(),
      competitiveMatrix: this.generateCompetitiveMatrix(),
      messagingHierarchy: this.generateMessagingHierarchy(),
      rawData: this.positioning,
    };
  }
}

module.exports = PositioningEngine;
