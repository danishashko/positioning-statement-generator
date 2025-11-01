/**
 * AI Enhancement Module
 * Uses OpenAI to provide intelligent suggestions and improvements
 */

const OpenAI = require('openai');

class AIEnhancer {
  constructor(apiKey) {
    this.client = apiKey ? new OpenAI({ apiKey }) : null;
    this.model = 'gpt-4o-mini';
  }

  /**
   * Check if AI is enabled
   */
  isEnabled() {
    return this.client !== null;
  }

  /**
   * Infer customer problem from competitive alternatives
   */
  async inferProblem(targetMarket, competitiveAlternatives) {
    if (!this.isEnabled()) {
      return this.fallbackInferProblem(competitiveAlternatives);
    }

    try {
      const prompt = `You are a product marketing expert. Based on the following information, infer the main problem that the target market is experiencing.

Target Market: ${targetMarket}
Competitive Alternatives: ${competitiveAlternatives.join(', ')}

Respond with a concise problem statement (one sentence, no quotes). Focus on the pain point, not the solution.

Example format: "struggle with manual, time-consuming data entry that causes errors"`;

      const response = await this.client.chat.completions.create({
        model: this.model,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 100,
      });

      return response.choices[0].message.content.trim();
    } catch (error) {
      console.error('AI error, using fallback:', error.message);
      return this.fallbackInferProblem(competitiveAlternatives);
    }
  }

  /**
   * Improve value proposition phrasing
   */
  async improveValueProp(valueProp, targetMarket) {
    if (!this.isEnabled()) return valueProp;

    try {
      const prompt = `You are a product marketing expert. Improve this value proposition to be more customer-centric and outcome-focused.

Original Value Prop: ${valueProp}
Target Market: ${targetMarket}

Rules:
- Focus on outcomes, not features
- Use active voice
- Be specific and concrete
- Keep it under 15 words
- Don't use buzzwords

Respond with ONLY the improved value proposition, no explanation.`;

      const response = await this.client.chat.completions.create({
        model: this.model,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 50,
      });

      return response.choices[0].message.content.trim().replace(/['"]/g, '');
    } catch (error) {
      return valueProp;
    }
  }

  /**
   * Critique positioning statement
   */
  async critiquePositioning(positioningStatement) {
    if (!this.isEnabled()) return null;

    try {
      const prompt = `You are April Dunford, positioning expert. Critique this positioning statement and provide 1-2 specific improvements.

Positioning Statement: ${positioningStatement}

Provide constructive feedback in 2-3 bullet points. Be specific and actionable.`;

      const response = await this.client.chat.completions.create({
        model: this.model,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.8,
        max_tokens: 200,
      });

      return response.choices[0].message.content.trim();
    } catch (error) {
      return null;
    }
  }

  /**
   * Generate alternative positioning variations
   */
  async generateAlternatives(productName, targetMarket, valueTheme, marketCategory) {
    if (!this.isEnabled()) return [];

    try {
      const prompt = `Generate 3 alternative positioning statement variations for:

Product: ${productName}
Target Market: ${targetMarket}
Main Value: ${valueTheme}
Category: ${marketCategory}

Each variation should emphasize a different angle (outcome-focused, differentiation-focused, category-focused).

Format:
1. [positioning statement]
2. [positioning statement]
3. [positioning statement]`;

      const response = await this.client.chat.completions.create({
        model: this.model,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.9,
        max_tokens: 300,
      });

      const content = response.choices[0].message.content.trim();
      const variations = content
        .split('\n')
        .filter(line => /^\d+\./.test(line))
        .map(line => line.replace(/^\d+\.\s*/, '').trim());

      return variations;
    } catch (error) {
      return [];
    }
  }

  /**
   * Suggest market category based on positioning
   */
  async suggestCategory(productName, uniqueAttributes, valueThemes, targetMarket) {
    if (!this.isEnabled()) return [];

    try {
      const prompt = `You are a positioning strategist. Suggest 3 possible market categories for this product.

Product: ${productName}
Unique Attributes: ${uniqueAttributes.join(', ')}
Value Themes: ${valueThemes.join(', ')}
Target Market: ${targetMarket}

Suggest 3 market categories that would make the value obvious to the target market. Be specific (not just "SaaS" or "platform").

Format:
1. [category name]
2. [category name]
3. [category name]`;

      const response = await this.client.chat.completions.create({
        model: this.model,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.8,
        max_tokens: 150,
      });

      const content = response.choices[0].message.content.trim();
      const categories = content
        .split('\n')
        .filter(line => /^\d+\./.test(line))
        .map(line => line.replace(/^\d+\.\s*/, '').trim());

      return categories;
    } catch (error) {
      return [];
    }
  }

  /**
   * Fallback problem inference (no AI)
   */
  fallbackInferProblem(competitiveAlternatives) {
    const alts = competitiveAlternatives.join(' ').toLowerCase();

    if (alts.includes('spreadsheet') || alts.includes('excel') || alts.includes('google sheets')) {
      return 'struggle with manual, error-prone processes';
    }
    if (alts.includes('email') || alts.includes('slack')) {
      return 'struggle with scattered, unorganized communication';
    }
    if (alts.includes('nothing') || alts.includes('doing it manually')) {
      return 'struggle with this problem without any solution';
    }
    if (alts.includes('hire') || alts.includes('hiring')) {
      return 'struggle with high costs and slow turnaround times';
    }

    return `struggle with inefficient workflows using ${competitiveAlternatives[0]}`;
  }
}

module.exports = AIEnhancer;
