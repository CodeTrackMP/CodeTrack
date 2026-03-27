CREATE TYPE difficulty AS ENUM ('EASY', 'MEDIUM', 'HARD', 'UNRATED');

CREATE TABLE problems (
    id BIGSERIAL PRIMARY KEY,
    platform_id INT NOT NULL,
    platform_problem_id VARCHAR(100) NOT NULL,
    title VARCHAR(500) NOT NULL,
    difficulty difficulty NOT NULL DEFAULT 'UNRATED',
    rating INT,
    url VARCHAR(500),
    tags TEXT[],
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_problem_platform FOREIGN KEY (platform_id) REFERENCES platforms(id),
    CONSTRAINT uq_platform_problem UNIQUE (platform_id, platform_problem_id)
);

CREATE TABLE submissions (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    problem_id BIGINT NOT NULL,
    platform_id INT NOT NULL,
    platform_submission_id VARCHAR(100),
    status VARCHAR(50) NOT NULL,
    language VARCHAR(50),
    solved_at TIMESTAMP NOT NULL,
    time_taken_seconds INT,
    is_first_solve BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_submission_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_submission_problem FOREIGN KEY (problem_id) REFERENCES problems(id),
    CONSTRAINT fk_submission_platform FOREIGN KEY (platform_id) REFERENCES platforms(id),
    CONSTRAINT uq_platform_submission UNIQUE (platform_id, platform_submission_id)
);