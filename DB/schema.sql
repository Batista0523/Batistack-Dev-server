\c batistack_dev

CREATE TABLE traffic_events (
    id SERIAL PRIMARY KEY,
    event_type TEXT NOT NULL,           
    path TEXT NOT NULL,                 
    referrer TEXT,                      
    utm_source TEXT,                 
    utm_medium TEXT,
    utm_campaign TEXT,
    user_agent TEXT,
    ip_address TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE daily_stats (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    total_visits INT DEFAULT 0,
    total_clicks INT DEFAULT 0,
    unique_visitors INT DEFAULT 0
);


CREATE TABLE seo_keywords (
    id SERIAL PRIMARY KEY,
    keyword TEXT NOT NULL,
    impressions INT DEFAULT 0,
    clicks INT DEFAULT 0,
    ctr NUMERIC(5,2),              
    avg_position NUMERIC(5,2),
    date DATE
);


CREATE TABLE marketing_campaigns (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    platform TEXT,                 
    utm_campaign TEXT,           
    budget NUMERIC,
    start_date DATE,
    end_date DATE
);


CREATE TABLE leads (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT,
    source TEXT,                  
    created_at TIMESTAMP DEFAULT NOW()
);