-- ============================================
-- Nova Studio - Seed Data
-- ============================================

-- Services
INSERT INTO services (title, description, icon, features, sort_order) VALUES
('AI Strategy Consulting', 'Leverage cutting-edge AI to transform your business strategy. We analyze your data and create intelligent roadmaps.', 'Brain', ARRAY['AI Readiness Assessment', 'Strategic Roadmap', 'ROI Analysis', 'Implementation Plan'], 1),
('Generative AI Solutions', 'Custom generative AI models for content creation, design, and automation tailored to your brand.', 'Sparkles', ARRAY['Custom Model Training', 'Content Generation', 'Design Automation', 'Brand Voice AI'], 2),
('Intelligent Automation', 'Streamline operations with AI-powered automation that reduces costs and increases efficiency.', 'Zap', ARRAY['Process Mining', 'Workflow Automation', 'Integration Setup', 'Performance Monitoring'], 3),
('AI-Powered Analytics', 'Turn raw data into actionable insights with advanced machine learning and predictive analytics.', 'BarChart3', ARRAY['Predictive Modeling', 'Real-time Dashboards', 'Anomaly Detection', 'Custom Reports'], 4);

-- Portfolio
INSERT INTO portfolio (title, description, category, image_url, link_url, sort_order) VALUES
('NeuroStyle — AI Fashion Platform', 'An end-to-end AI platform that generates fashion designs from mood boards and trends.', 'AI Platform', 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80', '#', 1),
('DataVault Analytics Dashboard', 'Real-time analytics dashboard with AI-powered insights for enterprise data management.', 'Analytics', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', '#', 2),
('ConversAI — Customer Service Bot', 'Multilingual AI chatbot handling 50,000+ customer interactions daily with 95% resolution rate.', 'Chatbot', 'https://images.unsplash.com/photo-1531746790098-59b29520ff3c?w=800&q=80', '#', 3),
('SmartRetail — Inventory AI', 'Predictive inventory management system reducing waste by 40% for retail chains.', 'ML System', 'https://images.unsplash.com/photo-1553729459-afe8d8d5c071?w=800&q=80', '#', 4),
('EchoVision — AI Video Editor', 'Automatic video editing with scene detection, smart transitions, and AI color grading.', 'Creative AI', 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80', '#', 5),
('CloudMind — DevOps Intelligence', 'AI-powered DevOps platform predicting incidents and automatically resolving infrastructure issues.', 'DevOps', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80', '#', 6);

-- Testimonials
INSERT INTO testimonials (name, role, company, content, rating, sort_order) VALUES
('Sarah Chen', 'CTO', 'TechVista Inc.', 'Nova Studio transformed our entire AI infrastructure. The predictive analytics dashboard they built saves us 20 hours of manual work every week. Truly world-class work.', 5, 1),
('Marcus Rodriguez', 'VP of Product', 'NeuralPath', 'We went from concept to production with their generative AI solution in under 3 months. The ROI has been incredible — our content team is now 3x more productive.', 5, 2),
('Emily Watson', 'Head of Innovation', 'QuantumLeap', 'Working with Nova Studio felt like partnering with a team from the future. They understood our vision instantly and delivered beyond expectations.', 5, 3),
('David Park', 'CEO', 'SwiftScale AI', 'The automation workflows Nova built eliminated 80% of our manual processes. Our team can now focus on what truly matters — building great products.', 5, 4),
('Aiko Tanaka', 'Design Director', 'Kanvas Creative', 'Their AI design platform is revolutionary. We are generating concepts in minutes that used to take days. Nova understands both tech and creativity.', 5, 5);

-- Pricing
INSERT INTO pricing (name, price, description, features, highlighted, cta_text, sort_order) VALUES
('Starter', 999, 'Perfect for startups and small teams getting started with AI.', ARRAY['1 AI Project', 'Basic Analytics Dashboard', '5 Team Members', 'Email Support', 'Monthly Strategy Call'], false, 'Start Free Trial', 1),
('Professional', 2999, 'For growing companies that need comprehensive AI solutions.', ARRAY['3 AI Projects', 'Advanced Analytics', 'Unlimited Team Members', 'Priority Support', 'Weekly Strategy Calls', 'Custom Model Training', 'API Access'], true, 'Get Started', 2),
('Enterprise', 9999, 'Full-scale AI transformation for large organizations.', ARRAY['Unlimited AI Projects', 'Enterprise Analytics Suite', 'Dedicated AI Team', '24/7 Premium Support', 'Daily Strategy Sessions', 'On-Premise Deployment', 'Custom Integrations', 'SLA Guarantee'], false, 'Contact Sales', 3);

-- FAQ
INSERT INTO faq (question, answer, sort_order) VALUES
('What makes Nova Studio different from other AI agencies?', 'We combine deep technical expertise with creative vision. Our team includes PhD-level AI researchers and award-winning designers who work together to deliver solutions that are both technically brilliant and beautifully designed.', 1),
('How long does a typical AI project take?', 'Project timelines vary by scope. A focused solution can launch in 4-8 weeks, while comprehensive platforms may take 3-6 months. We always provide a clear timeline during the discovery phase.', 2),
('Do you offer post-launch support?', 'Absolutely. Every project includes a 90-day support period, and we offer ongoing maintenance plans. Our team monitors performance and provides regular optimization updates.', 3),
('What industries do you work with?', 'We have delivered successful projects across fintech, healthcare, retail, media, manufacturing, and SaaS. Our AI solutions are industry-agnostic and adaptable to any domain.', 4),
('How do you handle data privacy and security?', 'Security is built into every layer of our solutions. We are SOC 2 compliant, follow GDPR best practices, and can deploy on your infrastructure for complete data sovereignty.', 5),
('Can you work with our existing tech stack?', 'Yes, we design our solutions to integrate seamlessly with your current systems. We have experience with all major cloud providers, databases, and enterprise tools.', 6);
