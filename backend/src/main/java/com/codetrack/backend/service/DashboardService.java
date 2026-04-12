package com.codetrack.backend.service;

import com.codetrack.backend.dto.response.*;
import com.codetrack.backend.Entity.*;
import com.codetrack.backend.Repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final UserRepository userRepository;
    private final SubmissionRepository submissionRepository;
    private final DailyStatsRepository dailyStatsRepository;
    private final UserPlatformConnectionRepository connectionRepository;
    private final PlatformRepository platformRepository;

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext()
                .getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public StatsOverviewResponse getStatsOverview() {
        User user = getCurrentUser();
        List<Submission> submissions = submissionRepository
                .findByUserIdOrderBySolvedAtDesc(user.getId());

        // Total unique solved
        long totalSolved = submissions.stream()
                .filter(Submission::getIsFirstSolve)
                .count();

        // Current streak from daily_stats
        List<DailyStats> stats = dailyStatsRepository
                .findByUserIdOrderByStatDateDesc(user.getId());

        int streak = 0;
        LocalDate expected = LocalDate.now();
        for (DailyStats stat : stats) {
            if (stat.getStatDate().equals(expected) && stat.getProblemsSolved() > 0) {
                streak++;
                expected = expected.minusDays(1);
            } else {
                break;
            }
        }

        // Accuracy = accepted / total submissions
        long total = submissions.size();
        long accepted = submissions.stream()
                .filter(s -> s.getStatus().equalsIgnoreCase("ACCEPTED"))
                .count();
        double accuracy = total > 0 ? (accepted * 100.0 / total) : 0.0;

        StatsOverviewResponse response = new StatsOverviewResponse();
        response.setTotalSolved((int) totalSolved);
        response.setCurrentStreak(streak);
        response.setRanking(0); // placeholder until ranking system is built
        response.setAccuracy(Math.round(accuracy * 100.0) / 100.0);
        return response;
    }

    public List<PlatformStatsResponse> getPlatformStats() {
        User user = getCurrentUser();
        List<UserPlatformConnection> connections = connectionRepository
                .findByUserId(user.getId());

        List<PlatformStatsResponse> result = new ArrayList<>();

        for (UserPlatformConnection conn : connections) {
            Platform platform = conn.getPlatform();
            List<Submission> platformSubmissions = submissionRepository
                    .findByUserIdAndPlatformId(user.getId(), platform.getId());

            long easy = platformSubmissions.stream()
                    .filter(s -> s.getIsFirstSolve() &&
                            s.getProblem().getDifficulty().name().equals("EASY"))
                    .count();
            long medium = platformSubmissions.stream()
                    .filter(s -> s.getIsFirstSolve() &&
                            s.getProblem().getDifficulty().name().equals("MEDIUM"))
                    .count();
            long hard = platformSubmissions.stream()
                    .filter(s -> s.getIsFirstSolve() &&
                            s.getProblem().getDifficulty().name().equals("HARD"))
                    .count();

            // Collect unique topics from tags
            List<String> topics = platformSubmissions.stream()
                    .filter(s -> s.getProblem().getTags() != null)
                    .flatMap(s -> s.getProblem().getTags().stream())
                    .distinct()
                    .limit(5)
                    .collect(Collectors.toList());

            // Streak for this platform
            List<DailyStats> stats = dailyStatsRepository
                    .findByUserIdOrderByStatDateDesc(user.getId());
            int streak = 0;
            LocalDate expected = LocalDate.now();
            for (DailyStats stat : stats) {
                if (stat.getActivePlatforms() != null &&
                        Arrays.asList(stat.getActivePlatforms())
                                .contains(platform.getName()) &&
                        stat.getStatDate().equals(expected)) {
                    streak++;
                    expected = expected.minusDays(1);
                } else {
                    break;
                }
            }

            String color = platform.getName().equalsIgnoreCase("LEETCODE")
                    ? "orange" : "blue";
            String logo = platform.getName().equalsIgnoreCase("LEETCODE")
                    ? "https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png"
                    : "https://cdn.iconscout.com/icon/free/png-512/free-code-forces-logo-icon-svg-download-link-cmyk-free-vector-from-rawpixel.png";

            PlatformStatsResponse p = new PlatformStatsResponse();
            p.setName(platform.getName());
            p.setLogo(logo);
            p.setColor(color);
            p.setSolved((int) (easy + medium + hard));
            p.setStreak(streak);
            p.setEasy((int) easy);
            p.setMedium((int) medium);
            p.setHard((int) hard);
            p.setTopics(topics);
            result.add(p);
        }

        return result;
    }

    public List<HeatmapEntryResponse> getHeatmap() {
        User user = getCurrentUser();
        LocalDate from = LocalDate.now().minusYears(1);
        LocalDate to = LocalDate.now();

        List<DailyStats> stats = dailyStatsRepository
                .findByUserIdAndStatDateBetweenOrderByStatDateAsc(
                        user.getId(), from, to);

        return stats.stream().map(s -> {
            HeatmapEntryResponse entry = new HeatmapEntryResponse();
            entry.setDate(s.getStatDate());
            entry.setCount(s.getProblemsSolved());
            return entry;
        }).collect(Collectors.toList());
    }

    public List<TopicActivityResponse> getTopicActivity() {
        User user = getCurrentUser();
        List<Submission> submissions = submissionRepository
                .findByUserIdOrderBySolvedAtDesc(user.getId());

        Map<String, Integer> topicCount = new LinkedHashMap<>();
        for (Submission s : submissions) {
            if (s.getIsFirstSolve() && s.getProblem().getTags() != null) {
                for (String tag : s.getProblem().getTags()) {
                    topicCount.merge(tag, 1, Integer::sum);
                }
            }
        }

        return topicCount.entrySet().stream()
                .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
                .limit(10)
                .map(e -> {
                    TopicActivityResponse r = new TopicActivityResponse();
                    r.setTopic(e.getKey());
                    r.setCount(e.getValue());
                    return r;
                })
                .collect(Collectors.toList());
    }
}