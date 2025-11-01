/**
 * Positioning Statement Generator - Core Logic
 * Based on April Dunford's "Obviously Awesome" Framework
 */

const AIEnhancer = require('./ai-enhancer');

class PositioningEngine {
  constructor(apiKey = null) {
    this.positioning = {
      productName: '',
      competitiveAlternatives: [],
      uniqueAttributes: [],
      valueThemes: [],
      targetMarket: '',
      marketCategory: '',
    };
    this.ai = new AIEnhancer(apiKey);
    this.aiSuggestions = {
      problem: null,
      improvedValues: [],
      critique: null,
      alternativePositioning: [],
      suggestedCategories: [],
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

    // Use AI-inferred problem if available, otherwise use fallback
    const problem = this.aiSuggestions.problem || this.ai.fallbackInferProblem(competitiveAlternatives);

    return `You know how ${targetMarket} struggle with ${problem}?

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
   * Generate AI-enhanced insights
   */
  async generateAIInsights() {
    if (!this.ai.isEnabled()) {
      return;
    }

    const { targetMarket, competitiveAlternatives, valueThemes, productName, uniqueAttributes, marketCategory } = this.positioning;

    try {
      // Infer problem
      this.aiSuggestions.problem = await this.ai.inferProblem(targetMarket, competitiveAlternatives);

      // Improve value propositions
      if (valueThemes.length > 0) {
        const improved = await this.ai.improveValueProp(valueThemes[0], targetMarket);
        this.aiSuggestions.improvedValues.push(improved);
      }

      // Critique positioning
      const statement = this.generatePositioningStatement();
      this.aiSuggestions.critique = await this.ai.critiquePositioning(statement);

      // Generate alternatives
      if (valueThemes.length > 0) {
        this.aiSuggestions.alternativePositioning = await this.ai.generateAlternatives(
          productName,
          targetMarket,
          valueThemes[0],
          marketCategory
        );
      }

      // Suggest categories (if category not set yet)
      if (uniqueAttributes.length > 0 && valueThemes.length > 0) {
        this.aiSuggestions.suggestedCategories = await this.ai.suggestCategory(
          productName,
          uniqueAttributes,
          valueThemes,
          targetMarket
        );
      }
    } catch (error) {
      console.error('Error generating AI insights:', error.message);
    }
  }

  /**
   * Get AI suggestions
   */
  getAISuggestions() {
    return this.aiSuggestions;
  }

  /**
   * Check if AI is enabled
   */
  isAIEnabled() {
    return this.ai.isEnabled();
  }

  /**
   * Infer problem from competitive alternatives
   */
  async inferProblem() {
    const { targetMarket, competitiveAlternatives } = this.positioning;
    return await this.ai.inferProblem(targetMarket, competitiveAlternatives);
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
