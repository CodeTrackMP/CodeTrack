-- Submissions lookups (most frequent queries)
CREATE INDEX idx_submissions_user_id ON submissions(user_id);
CREATE INDEX idx_submissions_solved_at ON submissions(solved_at);
CREATE INDEX idx_submissions_user_platform ON submissions(user_id, platform_id);

-- Daily stats for dashboard
CREATE INDEX idx_daily_stats_user_date ON daily_stats(user_id, stat_date DESC);


-- Challenge participants
CREATE INDEX idx_challenge_participants_challenge ON challenge_participants(challenge_id);
CREATE INDEX idx_challenge_participants_user ON challenge_participants(user_id);
