\c batistack_dev

INSERT INTO traffic_events (event_type, path, referrer, utm_source, utm_medium, utm_campaign, user_agent, ip_address, created_at)
VALUES 
('page_view', '/home', 'https://google.com', 'google', 'organic', 'summer_2025', 'Mozilla/5.0', '192.168.0.1', NOW() - INTERVAL '1 day'),
('click', '/services', 'https://facebook.com', 'facebook', 'paid', 'winter_2025', 'Mozilla/5.0', '192.168.0.2', NOW()),
('page_view', '/contact', 'https://instagram.com', 'instagram', 'paid', 'spring_2025', 'Mozilla/5.0', '192.168.0.3', NOW());

INSERT INTO daily_stats (date, total_visits, total_clicks, unique_visitors)
VALUES 
(CURRENT_DATE - INTERVAL '2 days', 100, 30, 80),
(CURRENT_DATE - INTERVAL '1 day', 150, 50, 120),
(CURRENT_DATE, 200, 70, 150);

INSERT INTO seo_keywords (keyword, impressions, clicks, ctr, avg_position, date)
VALUES 
('batistack development', 1000, 50, 5.00, 3.4, CURRENT_DATE - INTERVAL '2 days'),
('web development', 2000, 100, 5.00, 2.1, CURRENT_DATE - INTERVAL '1 day'),
('seo services', 1500, 75, 5.00, 1.8, CURRENT_DATE);

INSERT INTO marketing_campaigns (name, platform, utm_campaign, budget, start_date, end_date)
VALUES 
('Summer Campaign', 'Google Ads', 'summer_2025', 500.00, CURRENT_DATE - INTERVAL '10 days', CURRENT_DATE + INTERVAL '20 days'),
('Winter Campaign', 'Facebook', 'winter_2025', 300.00, CURRENT_DATE - INTERVAL '15 days', CURRENT_DATE + INTERVAL '15 days'),
('Spring Campaign', 'Instagram', 'spring_2025', 400.00, CURRENT_DATE - INTERVAL '5 days', CURRENT_DATE + INTERVAL '25 days');

INSERT INTO leads (name, email, message, source, created_at)
VALUES 
('John Doe', 'john.doe@example.com', 'I am interested in your services.', 'google', NOW() - INTERVAL '1 day'),
('Jane Smith', 'jane.smith@example.com', 'Can you provide more info?', 'facebook', NOW() - INTERVAL '2 days'),
('Carlos Rivera', 'carlos.rivera@example.com', 'Looking for a quote.', 'instagram', NOW());
