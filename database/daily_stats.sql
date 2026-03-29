CREATE TABLE daily_stats (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    stat_date DATE NOT NULL,
    problems_solved INT NOT NULL DEFAULT 0,
    easy_solved INT NOT NULL DEFAULT 0,
    medium_solved INT NOT NULL DEFAULT 0,
    hard_solved INT NOT NULL DEFAULT 0,
    contests_participated INT NOT NULL DEFAULT 0,
    active_platforms TEXT[],
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_daily_stats_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT uq_user_stat_date UNIQUE (user_id, stat_date)
);