import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import './App.css';

// Import PrismJS CSS
import 'prismjs/themes/prism-tomorrow.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/ai';

const CodeReviewer = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [reviewType, setReviewType] = useState('comprehensive');
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState(null);
  const [error, setError] = useState('');

  // Sample code for demonstration
  const sampleCode = `function calculateTotal(items) {
    var total = 0;
    for (var i = 0; i < items.length; i++) {
        total = total + items[i].price;
    }
    return total;
}

// Usage
var cart = [
    { name: "Apple", price: 1.50 },
    { name: "Banana", price: 0.75 }
];

console.log("Total: $" + calculateTotal(cart));`;

  const languages = [
    'javascript', 'typescript', 'python', 'java', 'cpp', 'csharp',
    'go', 'rust', 'php', 'ruby', 'swift', 'kotlin'
  ];

  const reviewTypes = [
    { value: 'comprehensive', label: 'Comprehensive Review' },
    { value: 'security', label: 'Security Focus' },
    { value: 'performance', label: 'Performance Focus' },
    { value: 'maintainability', label: 'Maintainability Focus' }
  ];

  // Load PrismJS dynamically when needed
  const loadPrism = async () => {
    if (typeof window !== 'undefined' && !window.Prism) {
      const Prism = await import('prismjs');
      
      // Load language components
      await import('prismjs/components/prism-javascript');
      await import('prismjs/components/prism-typescript');
      await import('prismjs/components/prism-python');
      await import('prismjs/components/prism-java');
      await import('prismjs/components/prism-cpp');
      await import('prismjs/components/prism-csharp');
      await import('prismjs/components/prism-go');
      await import('prismjs/components/prism-rust');
      await import('prismjs/components/prism-php');
      await import('prismjs/components/prism-ruby');
      await import('prismjs/components/prism-swift');
      await import('prismjs/components/prism-kotlin');
      
      return Prism.default;
    }
    return window.Prism;
  };

  useEffect(() => {
    // Highlight code when it changes
    if (code && typeof window !== 'undefined') {
      loadPrism().then((Prism) => {
        if (Prism) {
          setTimeout(() => Prism.highlightAll(), 0);
        }
      });
    }
  }, [code]);

  const loadSampleCode = () => {
    setCode(sampleCode);
  };

  const submitReview = async () => {
    if (!code.trim()) {
      setError('Please enter some code to review');
      return;
    }

    setLoading(true);
    setError('');
    setReview(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/review`, {
        code,
        language,
        reviewType
      });

      if (response.data.success) {
        setReview(response.data.data);
      } else {
        setError('Failed to get review from AI service');
      }
    } catch (err) {
      console.error('Review error:', err);
      setError(
        err.response?.data?.message || 
        'Failed to connect to AI service. Make sure the backend is running on port 3000.'
      );
    } finally {
      setLoading(false);
    }
  };

  const renderIssues = () => {
    if (!review?.review?.issues || review.review.issues.length === 0) {
      return <p className="no-issues">No issues found! 🎉</p>;
    }

    return (
      <div className="issues-list">
        {review.review.issues.map((issue, index) => (
          <div key={index} className={`issue-card ${issue.severity}`}>
            <div className="issue-header">
              <span className={`severity-badge ${issue.severity}`}>
                {issue.severity.toUpperCase()}
              </span>
              <span className="category-badge">{issue.category}</span>
              {issue.line && <span className="line-badge">Line {issue.line}</span>}
            </div>
            <h4>{issue.description}</h4>
            <p className="suggestion">{issue.suggestion}</p>
          </div>
        ))}
      </div>
    );
  };

  const renderStrengths = () => {
    if (!review?.review?.strengths || review.review.strengths.length === 0) {
      return null;
    }

    return (
      <div className="strengths-section">
        <h3>✅ Strengths</h3>
        <ul>
          {review.review.strengths.map((strength, index) => (
            <li key={index}>{strength}</li>
          ))}
        </ul>
      </div>
    );
  };

  const renderRecommendations = () => {
    if (!review?.review?.recommendations || review.review.recommendations.length === 0) {
      return null;
    }

    return (
      <div className="recommendations-section">
        <h3>💡 Recommendations</h3>
        <ul>
          {review.review.recommendations.map((rec, index) => (
            <li key={index}>{rec}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="code-reviewer">
      <header className="app-header">
        <h1>🤖 AI Code Reviewer</h1>
        <p>Write code on the left, get AI feedback on the right</p>
      </header>

      <div className="main-container">
        <div className="split-layout">
          {/* Left Panel - Code Writing */}
          <div className="code-panel">
            <div className="panel-header">
              <h2>📝 Code Editor</h2>
              <div className="controls">
                <div className="control-group">
                  <label htmlFor="language">Language:</label>
                  <select 
                    id="language"
                    value={language} 
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    {languages.map(lang => (
                      <option key={lang} value={lang}>
                        {lang.charAt(0).toUpperCase() + lang.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="control-group">
                  <label htmlFor="reviewType">Review Type:</label>
                  <select 
                    id="reviewType"
                    value={reviewType} 
                    onChange={(e) => setReviewType(e.target.value)}
                  >
                    {reviewTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <button 
                  className="sample-btn"
                  onClick={loadSampleCode}
                  type="button"
                >
                  Load Sample
                </button>
              </div>
            </div>

            <div className="code-editor-container">
              <textarea
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="// Write or paste your code here...
function example() {
    console.log('Hello, AI Code Reviewer!');
}"
                className="code-textarea"
              />
            </div>

            {code && (
              <div className="code-preview">
                <div className="preview-header">
                  <h3>Syntax Preview</h3>
                </div>
                <pre className="code-block">
                  <code className={`language-${language}`}>
                    {code}
                  </code>
                </pre>
              </div>
            )}

            <div className="action-panel">
              {error && (
                <div className="error-message">
                  ❌ {error}
                </div>
              )}

              <button 
                className="review-btn"
                onClick={submitReview}
                disabled={loading || !code.trim()}
              >
                {loading ? '🔄 Analyzing Code...' : '🚀 Get AI Review'}
              </button>
            </div>
          </div>

          {/* Right Panel - AI Feedback */}
          <div className="feedback-panel">
            <div className="panel-header">
              <h2>🤖 AI Feedback</h2>
              {review && (
                <div className="rating">
                  <span>Rating: </span>
                  <span className="rating-score">{review.review.overall_rating}/10</span>
                </div>
              )}
            </div>

            <div className="feedback-content">
              {!review && !loading && (
                <div className="welcome-message">
                  <div className="welcome-icon">🎯</div>
                  <h3>Ready to Review Your Code!</h3>
                  <p>Write some code in the editor on the left, then click "Get AI Review" to receive comprehensive feedback including:</p>
                  <ul>
                    <li>🐛 Bug detection and fixes</li>
                    <li>⚡ Performance optimizations</li>
                    <li>🔒 Security vulnerability analysis</li>
                    <li>📚 Best practice recommendations</li>
                    <li>🎨 Code style improvements</li>
                  </ul>
                </div>
              )}

              {loading && (
                <div className="loading-state">
                  <div className="loading-spinner">🔄</div>
                  <h3>AI is analyzing your code...</h3>
                  <p>Please wait while our AI examines your code for issues, improvements, and best practices.</p>
                </div>
              )}

              {review && (
                <div className="review-results">
                  <div className="summary-section">
                    <h3>📋 Summary</h3>
                    <div className="summary-content">
                      <ReactMarkdown>{review.review.summary}</ReactMarkdown>
                    </div>
                  </div>

                  <div className="issues-section">
                    <h3>🐛 Issues Found ({review.review.issues?.length || 0})</h3>
                    {renderIssues()}
                  </div>

                  {renderStrengths()}
                  {renderRecommendations()}

                  <div className="metadata-section">
                    <h3>📈 Analysis Details</h3>
                    <div className="metadata-grid">
                      <div className="metadata-item">
                        <strong>Language:</strong> {review.metadata.language}
                      </div>
                      <div className="metadata-item">
                        <strong>Review Type:</strong> {review.metadata.reviewType}
                      </div>
                      <div className="metadata-item">
                        <strong>Code Length:</strong> {review.metadata.codeLength} chars
                      </div>
                      <div className="metadata-item">
                        <strong>Analyzed:</strong> {new Date(review.metadata.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeReviewer;
