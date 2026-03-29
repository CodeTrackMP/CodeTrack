CREATE TYPE challenge_status AS ENUM ('DRAFT', 'ACTIVE', 'COMPLETED', 'CANCELLED');
CREATE TYPE participant_status AS ENUM ('INVITED', 'ACCEPTED', 'DECLINED', 'REMOVED');

CREATE TABLE challenges (
    id BIGSERIAL PRIMARY KEY,
    creator_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status challenge_status NOT NULL DEFAULT 'DRAFT',
    starts_at TIMESTAMP NOT NULL,
    ends_at TIMESTAMP NOT NULL,
    weight_problems_solved NUMERIC(5,2) NOT NULL DEFAULT 70.00,
    weight_time_efficiency NUMERIC(5,2) NOT NULL DEFAULT 30.00,
    group_id BIGINT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_challenge_creator FOREIGN KEY (creator_id) REFERENCES users(id),
    CONSTRAINT chk_weights CHECK (weight_problems_solved + weight_time_efficiency = 100)
);

CREATE TABLE challenge_participants (
    id BIGSERIAL PRIMARY KEY,
    challenge_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    status participant_status NOT NULL DEFAULT 'INVITED',
    problems_solved INT NOT NULL DEFAULT 0,
    score NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    rank INT,
    joined_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_participant_challenge FOREIGN KEY (challenge_id) REFERENCES challenges(id) ON DELETE CASCADE,
    CONSTRAINT fk_participant_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT uq_challenge_user UNIQUE (challenge_id, user_id)
);