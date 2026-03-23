-- CodeTrack Database Schema

-- Table 1: Users
CREATE TABLE users (
    id            SERIAL PRIMARY KEY,
    username      VARCHAR(50) NOT NULL UNIQUE,
    email         VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    display_name  VARCHAR(100),
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table 2: Coding Platforms 
CREATE TABLE coding_platforms (
    id           SERIAL PRIMARY KEY,
    name         VARCHAR(50) NOT NULL UNIQUE,
    display_name VARCHAR(100) NOT NULL,
    base_url     VARCHAR(255) NOT NULL
);

INSERT INTO coding_platforms (name, display_name, base_url) VALUES
    ('codeforces', 'Codeforces', 'https://codeforces.com'),
    ('leetcode', 'LeetCode', 'https://leetcode.com');

-- Table 3: User Platform Connections
-- Stores which platform handle a user has linked
CREATE TABLE user_platform_connections (
    id              SERIAL PRIMARY KEY,
    user_id         INT NOT NULL REFERENCES users(id),
    platform_id     INT NOT NULL REFERENCES coding_platforms(id),
    platform_handle VARCHAR(100) NOT NULL,
    connected_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table 4: Problems
-- Stores problems from all platforms
CREATE TABLE problems (
    id          SERIAL PRIMARY KEY,
    platform_id INT NOT NULL REFERENCES coding_platforms(id),
    title       VARCHAR(500) NOT NULL,
    difficulty  VARCHAR(20),
    url         VARCHAR(500)
);

-- Table 5: User Submissions
-- Stores every submission a user has made
CREATE TABLE user_submissions (
    id           SERIAL PRIMARY KEY,
    user_id      INT NOT NULL REFERENCES users(id),
    problem_id   INT NOT NULL REFERENCES problems(id),
    platform_id  INT NOT NULL REFERENCES coding_platforms(id),
    verdict      VARCHAR(20) NOT NULL,
    language     VARCHAR(50),
    submitted_at TIMESTAMP NOT NULL
);

-- Table 6: User Streaks
CREATE TABLE user_streaks (
    id               SERIAL PRIMARY KEY,
    user_id          INT NOT NULL REFERENCES users(id),
    current_streak   INT DEFAULT 0,
    longest_streak   INT DEFAULT 0,
    last_active_date DATE
);
