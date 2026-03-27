CREATE TABLE platforms (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    base_url VARCHAR(255) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO platforms (name, base_url) VALUES
    ('CODEFORCES', 'https://codeforces.com'),
    ('LEETCODE', 'https://leetcode.com');
    
CREATE TYPE sync_status AS ENUM ('PENDING', 'SYNCING', 'COMPLETED', 'FAILED');

CREATE TABLE user_platform_connections (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    platform_id INT NOT NULL,
    platform_username VARCHAR(100) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    sync_status sync_status NOT NULL DEFAULT 'PENDING',
    last_synced_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_connection_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_connection_platform FOREIGN KEY (platform_id) REFERENCES platforms(id),
    CONSTRAINT uq_user_platform UNIQUE (user_id, platform_id)
);


