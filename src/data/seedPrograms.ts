// Generated from the iOS app's seed files (SeedPrograms, JLLSeedPrograms, T550SeedPrograms).
import type { SeedProgram } from '../db/types'

export const SEED_PROGRAMS: SeedProgram[] = [
  {
    "name": "Easy Incline Intro",
    "description": "A gentle introduction to incline walking for complete beginners.",
    "difficulty": "easy",
    "workoutType": "incline",
    "trainingObjective": "Builds aerobic base with low joint impact.",
    "intervals": [
      {
        "name": "Warm Up",
        "durationSeconds": 300,
        "speed": 4.0,
        "incline": 0.0
      },
      {
        "name": "Incline Walk",
        "durationSeconds": 600,
        "speed": 4.0,
        "incline": 3.0,
        "instruction": "Increase incline to 3%"
      },
      {
        "name": "Incline Push",
        "durationSeconds": 300,
        "speed": 4.5,
        "incline": 5.0,
        "instruction": "Increase incline to 5%"
      },
      {
        "name": "Cool Down",
        "durationSeconds": 300,
        "speed": 3.5,
        "incline": 0.0,
        "instruction": "Reduce incline to 0%"
      }
    ]
  },
  {
    "name": "Recovery Walk",
    "description": "A very low-intensity walk for active recovery between harder sessions.",
    "difficulty": "easy",
    "workoutType": "recovery",
    "trainingObjective": "Promotes blood flow without adding fatigue.",
    "intervals": [
      {
        "name": "Warm Up",
        "durationSeconds": 180,
        "speed": 3.5,
        "incline": 0.0
      },
      {
        "name": "Steady Walk",
        "durationSeconds": 600,
        "speed": 4.5,
        "incline": 1.0
      },
      {
        "name": "Cool Down",
        "durationSeconds": 120,
        "speed": 3.5,
        "incline": 0.0
      }
    ]
  },
  {
    "name": "Beginner Jog",
    "description": "Alternating short jog and walk segments to build toward continuous running.",
    "difficulty": "easy",
    "workoutType": "cardio",
    "trainingObjective": "Builds run tolerance for those new to jogging.",
    "intervals": [
      {
        "name": "Warm Up",
        "durationSeconds": 300,
        "speed": 4.0,
        "incline": 0.0
      },
      {
        "name": "Jog",
        "durationSeconds": 180,
        "speed": 6.0,
        "incline": 0.0,
        "instruction": "Increase speed to 6.0 km/h"
      },
      {
        "name": "Walk",
        "durationSeconds": 120,
        "speed": 4.0,
        "incline": 0.0,
        "instruction": "Reduce speed to 4.0 km/h"
      },
      {
        "name": "Jog",
        "durationSeconds": 180,
        "speed": 6.0,
        "incline": 0.0,
        "instruction": "Increase speed to 6.0 km/h"
      },
      {
        "name": "Walk",
        "durationSeconds": 120,
        "speed": 4.0,
        "incline": 0.0,
        "instruction": "Reduce speed to 4.0 km/h"
      },
      {
        "name": "Cool Down",
        "durationSeconds": 300,
        "speed": 3.0,
        "incline": 0.0
      }
    ]
  },
  {
    "name": "Walk & Rise Pyramid",
    "description": "Incline steps up then back down while speed stays steady.",
    "difficulty": "easy",
    "workoutType": "pyramid",
    "trainingObjective": "Introduces variable resistance without speed demands.",
    "intervals": [
      {
        "name": "Warm Up",
        "durationSeconds": 180,
        "speed": 4.0,
        "incline": 0.0
      },
      {
        "name": "Rise 1",
        "durationSeconds": 180,
        "speed": 6.0,
        "incline": 2.0,
        "instruction": "Incline to 2%"
      },
      {
        "name": "Rise 2",
        "durationSeconds": 180,
        "speed": 6.0,
        "incline": 4.0,
        "instruction": "Incline to 5%"
      },
      {
        "name": "Peak",
        "durationSeconds": 180,
        "speed": 6.0,
        "incline": 4.0
      },
      {
        "name": "Descend 1",
        "durationSeconds": 180,
        "speed": 6.0,
        "incline": 2.0,
        "instruction": "Incline to 2%"
      },
      {
        "name": "Cool Down",
        "durationSeconds": 180,
        "speed": 4.0,
        "incline": 0.0,
        "instruction": "Incline to 0%"
      }
    ]
  },
  {
    "name": "Moderate Incline Walk",
    "description": "A longer sustained walk with elevated incline held throughout.",
    "difficulty": "moderate",
    "workoutType": "incline",
    "trainingObjective": "Builds lower-body strength and aerobic capacity.",
    "intervals": [
      {
        "name": "Warm Up",
        "durationSeconds": 300,
        "speed": 6.0,
        "incline": 0.0
      },
      {
        "name": "Incline Block",
        "durationSeconds": 900,
        "speed": 7.0,
        "incline": 5.0,
        "instruction": "Increase incline to 5%"
      },
      {
        "name": "Incline Push",
        "durationSeconds": 300,
        "speed": 8.0,
        "incline": 6.0,
        "instruction": "Increase incline to 6%"
      },
      {
        "name": "Cool Down",
        "durationSeconds": 300,
        "speed": 4.0,
        "incline": 0.0
      }
    ]
  },
  {
    "name": "Tempo Runner",
    "description": "A sustained comfortably-hard effort at threshold pace.",
    "difficulty": "moderate",
    "workoutType": "tempo",
    "trainingObjective": "Improves lactate-threshold pace.",
    "intervals": [
      {
        "name": "Warm Up",
        "durationSeconds": 300,
        "speed": 5.5,
        "incline": 0.0
      },
      {
        "name": "Build",
        "durationSeconds": 180,
        "speed": 7.0,
        "incline": 0.0,
        "instruction": "Increase speed to 7.0 km/h"
      },
      {
        "name": "Tempo",
        "durationSeconds": 900,
        "speed": 8.5,
        "incline": 2.0,
        "instruction": "Increase speed to 8.5 km/h"
      },
      {
        "name": "Cool Down",
        "durationSeconds": 420,
        "speed": 6.0,
        "incline": 0.0,
        "instruction": "Reduce speed to 6.0 km/h"
      }
    ]
  },
  {
    "name": "Long Slow Distance",
    "description": "A long steady effort at conversational pace.",
    "difficulty": "moderate",
    "workoutType": "endurance",
    "trainingObjective": "Builds aerobic base and endurance capacity.",
    "intervals": [
      {
        "name": "Warm Up",
        "durationSeconds": 300,
        "speed": 5.0,
        "incline": 0.0
      },
      {
        "name": "Steady Effort",
        "durationSeconds": 1800,
        "speed": 7.0,
        "incline": 1.0
      },
      {
        "name": "Cool Down",
        "durationSeconds": 300,
        "speed": 4.5,
        "incline": 0.0
      }
    ]
  },
  {
    "name": "Mixed Jog-Incline",
    "description": "Alternates jogging on flat with incline-walk recovery blocks.",
    "difficulty": "moderate",
    "workoutType": "mixed",
    "trainingObjective": "Blends cardio and strength stimulus.",
    "intervals": [
      {
        "name": "Warm Up",
        "durationSeconds": 300,
        "speed": 6.0,
        "incline": 0.0
      },
      {
        "name": "Jog",
        "durationSeconds": 300,
        "speed": 8.0,
        "incline": 0.0,
        "instruction": "Increase speed to 8.0 km/h"
      },
      {
        "name": "Incline Recovery",
        "durationSeconds": 240,
        "speed": 6.0,
        "incline": 4.0,
        "instruction": "Reduce speed, incline to 4%"
      },
      {
        "name": "Jog",
        "durationSeconds": 300,
        "speed": 8.0,
        "incline": 0.0,
        "instruction": "Incline to 0%, speed to 8.0 km/h"
      },
      {
        "name": "Incline Recovery",
        "durationSeconds": 240,
        "speed": 6.0,
        "incline": 4.0,
        "instruction": "Reduce speed, incline to 4%"
      },
      {
        "name": "Cool Down",
        "durationSeconds": 300,
        "speed": 4.0,
        "incline": 0.0
      }
    ]
  },
  {
    "name": "Incline Pyramid",
    "description": "Incline rises stepwise to a peak then descends at constant speed.",
    "difficulty": "moderate",
    "workoutType": "pyramid",
    "trainingObjective": "Progressive strength and cardio challenge.",
    "intervals": [
      {
        "name": "Warm Up",
        "durationSeconds": 240,
        "speed": 6.0,
        "incline": 0.0
      },
      {
        "name": "Step 1",
        "durationSeconds": 180,
        "speed": 8.0,
        "incline": 2.0,
        "instruction": "Incline to 2%"
      },
      {
        "name": "Step 2",
        "durationSeconds": 180,
        "speed": 8.0,
        "incline": 4.0,
        "instruction": "Incline to 4%"
      },
      {
        "name": "Peak",
        "durationSeconds": 180,
        "speed": 8.0,
        "incline": 6.0,
        "instruction": "Incline to 6%"
      },
      {
        "name": "Step Down 1",
        "durationSeconds": 180,
        "speed": 8.0,
        "incline": 4.0,
        "instruction": "Incline to 4%"
      },
      {
        "name": "Step Down 2",
        "durationSeconds": 180,
        "speed": 8.0,
        "incline": 2.0,
        "instruction": "Incline to 2%"
      },
      {
        "name": "Cool Down",
        "durationSeconds": 300,
        "speed": 6.0,
        "incline": 0.0,
        "instruction": "Incline to 0%"
      }
    ]
  },
  {
    "name": "Steady Climb Endurance",
    "description": "One long sustained incline block at moderate jog pace.",
    "difficulty": "moderate",
    "workoutType": "incline",
    "trainingObjective": "Endurance and posterior-chain strength emphasis.",
    "intervals": [
      {
        "name": "Warm Up",
        "durationSeconds": 300,
        "speed": 5.0,
        "incline": 0.0
      },
      {
        "name": "Climb",
        "durationSeconds": 1200,
        "speed": 6.0,
        "incline": 5.0,
        "instruction": "Increase incline to 5%"
      },
      {
        "name": "Cool Down",
        "durationSeconds": 300,
        "speed": 5.0,
        "incline": 0.0
      }
    ]
  },
  {
    "name": "Progressive Incline Run",
    "description": "Incline increases gradually across the whole session.",
    "difficulty": "moderate",
    "workoutType": "incline",
    "trainingObjective": "Classic progression-run structure.",
    "intervals": [
      {
        "name": "Warm Up",
        "durationSeconds": 300,
        "speed": 6.0,
        "incline": 0.0
      },
      {
        "name": "Stage 1",
        "durationSeconds": 360,
        "speed": 8.0,
        "incline": 1.0,
        "instruction": "Incline to 1%"
      },
      {
        "name": "Stage 2",
        "durationSeconds": 360,
        "speed": 8.0,
        "incline": 3.0,
        "instruction": "Incline to 3%"
      },
      {
        "name": "Stage 3",
        "durationSeconds": 360,
        "speed": 8.0,
        "incline": 5.0,
        "instruction": "Incline to 5%"
      },
      {
        "name": "Cool Down",
        "durationSeconds": 300,
        "speed": 5.0,
        "incline": 0.0,
        "instruction": "Incline to 0%"
      }
    ]
  },
  {
    "name": "Speed Builder Intervals",
    "description": "Repeated on-efforts at elevated pace with equal recovery jogs.",
    "difficulty": "hard",
    "workoutType": "speed",
    "trainingObjective": "Targets speed and VO2-max-style stimulus.",
    "intervals": [
      {
        "name": "Warm Up",
        "durationSeconds": 180,
        "speed": 6.0,
        "incline": 0.0
      },
      {
        "name": "Fast",
        "durationSeconds": 120,
        "speed": 10.0,
        "incline": 0.0,
        "instruction": "Increase speed to 10.0 km/h"
      },
      {
        "name": "Recovery",
        "durationSeconds": 120,
        "speed": 6.0,
        "incline": 0.0,
        "instruction": "Reduce speed to 6.0 km/h"
      },
      {
        "name": "Fast",
        "durationSeconds": 120,
        "speed": 10.0,
        "incline": 0.0,
        "instruction": "Increase speed to 10.0 km/h"
      },
      {
        "name": "Recovery",
        "durationSeconds": 120,
        "speed": 6.0,
        "incline": 0.0,
        "instruction": "Reduce speed to 6.0 km/h"
      },
      {
        "name": "Fast",
        "durationSeconds": 120,
        "speed": 12.0,
        "incline": 0.0,
        "instruction": "Increase speed to 12.0 km/h"
      },
      {
        "name": "Recovery",
        "durationSeconds": 90,
        "speed": 8.0,
        "incline": 0.0,
        "instruction": "Reduce speed to 8.0 km/h"
      },
      {
        "name": "Cool Down",
        "durationSeconds": 180,
        "speed": 5.0,
        "incline": 0.0
      }
    ]
  },
  {
    "name": "Mixed Incline Intervals",
    "description": "Alternates flat-fast segments with steep-incline segments.",
    "difficulty": "hard",
    "workoutType": "hiit",
    "trainingObjective": "Combines cardio and strength intervals.",
    "intervals": [
      {
        "name": "Warm Up",
        "durationSeconds": 240,
        "speed": 8.0,
        "incline": 0.0
      },
      {
        "name": "Fast Flat",
        "durationSeconds": 150,
        "speed": 10.0,
        "incline": 0.0,
        "instruction": "Incline 0%, speed 10.0 km/h"
      },
      {
        "name": "Steep Climb",
        "durationSeconds": 150,
        "speed": 8.0,
        "incline": 7.0,
        "instruction": "Reduce speed, incline to 7%"
      },
      {
        "name": "Fast Flat",
        "durationSeconds": 150,
        "speed": 12.0,
        "incline": 0.0,
        "instruction": "Incline 0%, speed 12.0 km/h"
      },
      {
        "name": "Steep Climb",
        "durationSeconds": 150,
        "speed": 8.0,
        "incline": 7.0,
        "instruction": "Reduce speed, incline to 7%"
      },
      {
        "name": "Cool Down",
        "durationSeconds": 240,
        "speed": 6.0,
        "incline": 0.0
      }
    ]
  },
  {
    "name": "Dynamic Fartlek",
    "description": "Variable-length fast and moderate surges in a structured fartlek format.",
    "difficulty": "hard",
    "workoutType": "fartlek",
    "trainingObjective": "Builds pacing versatility and mental toughness.",
    "intervals": [
      {
        "name": "Warm Up",
        "durationSeconds": 300,
        "speed": 8.0,
        "incline": 0.0
      },
      {
        "name": "Surge",
        "durationSeconds": 60,
        "speed": 10.0,
        "incline": 0.0,
        "instruction": "Push to 10.0 km/h"
      },
      {
        "name": "Float",
        "durationSeconds": 120,
        "speed": 7.5,
        "incline": 0.0,
        "instruction": "Ease to 7.5 km/h"
      },
      {
        "name": "Surge",
        "durationSeconds": 90,
        "speed": 10.5,
        "incline": 0.0,
        "instruction": "Push to 10.5 km/h"
      },
      {
        "name": "Float",
        "durationSeconds": 150,
        "speed": 8.5,
        "incline": 0.0,
        "instruction": "Ease to 8.5 km/h"
      },
      {
        "name": "Surge",
        "durationSeconds": 45,
        "speed": 10.0,
        "incline": 0.0,
        "instruction": "Push to 10.0 km/h"
      },
      {
        "name": "Cool Down",
        "durationSeconds": 300,
        "speed": 6.0,
        "incline": 0.0
      }
    ]
  },
  {
    "name": "Music Tempo Fartlek",
    "description": "Shorter, punchier fartlek surges designed to key off a beat.",
    "difficulty": "hard",
    "workoutType": "fartlek",
    "trainingObjective": "Same intent as Dynamic Fartlek in a shorter format.",
    "intervals": [
      {
        "name": "Warm Up",
        "durationSeconds": 180,
        "speed": 6.0,
        "incline": 0.0
      },
      {
        "name": "Surge",
        "durationSeconds": 30,
        "speed": 10.0,
        "incline": 0.0,
        "instruction": "Push to 10.0 km/h"
      },
      {
        "name": "Float",
        "durationSeconds": 60,
        "speed": 7.5,
        "incline": 0.0,
        "instruction": "Ease to 7.5 km/h"
      },
      {
        "name": "Surge",
        "durationSeconds": 30,
        "speed": 10.5,
        "incline": 0.0,
        "instruction": "Push to 10.5 km/h"
      },
      {
        "name": "Float",
        "durationSeconds": 60,
        "speed": 8.5,
        "incline": 0.0,
        "instruction": "Ease to 8.5 km/h"
      },
      {
        "name": "Surge",
        "durationSeconds": 30,
        "speed": 10.0,
        "incline": 0.0,
        "instruction": "Push to 10.0 km/h"
      },
      {
        "name": "Cool Down",
        "durationSeconds": 240,
        "speed": 6.0,
        "incline": 0.0
      }
    ]
  },
  {
    "name": "HIIT Hill Climbs",
    "description": "Short high-incline surges with equal or longer recovery.",
    "difficulty": "hard",
    "workoutType": "hiit",
    "trainingObjective": "High cardiovascular demand with a strength component.",
    "intervals": [
      {
        "name": "Warm Up",
        "durationSeconds": 300,
        "speed": 6.0,
        "incline": 0.0
      },
      {
        "name": "Hill Surge",
        "durationSeconds": 45,
        "speed": 10.0,
        "incline": 7.0,
        "instruction": "Incline to 7%"
      },
      {
        "name": "Recovery",
        "durationSeconds": 60,
        "speed": 6.0,
        "incline": 3.0,
        "instruction": "Incline to 3%"
      },
      {
        "name": "Hill Surge",
        "durationSeconds": 45,
        "speed": 10.0,
        "incline": 8.0,
        "instruction": "Incline to 8%"
      },
      {
        "name": "Recovery",
        "durationSeconds": 60,
        "speed": 6.0,
        "incline": 3.0,
        "instruction": "Incline to 3%"
      },
      {
        "name": "Cool Down",
        "durationSeconds": 300,
        "speed": 4.0,
        "incline": 0.0
      }
    ]
  },
  {
    "name": "Sprint Ladder",
    "description": "A ladder of increasing-then-decreasing short sprint efforts with full recovery.",
    "difficulty": "intense",
    "workoutType": "speed",
    "trainingObjective": "High-intensity anaerobic stimulus.",
    "intervals": [
      {
        "name": "Warm Up",
        "durationSeconds": 240,
        "speed": 8.0,
        "incline": 0.0
      },
      {
        "name": "Sprint 1",
        "durationSeconds": 30,
        "speed": 11.0,
        "incline": 0.0,
        "instruction": "Sprint — 11.0 km/h"
      },
      {
        "name": "Recover",
        "durationSeconds": 60,
        "speed": 8.0,
        "incline": 0.0
      },
      {
        "name": "Sprint 2",
        "durationSeconds": 45,
        "speed": 12.0,
        "incline": 0.0,
        "instruction": "Sprint — 12.0 km/h"
      },
      {
        "name": "Recover",
        "durationSeconds": 90,
        "speed": 8.0,
        "incline": 0.0
      },
      {
        "name": "Sprint 3",
        "durationSeconds": 30,
        "speed": 11.0,
        "incline": 0.0,
        "instruction": "Sprint — 11.0 km/h"
      },
      {
        "name": "Cool Down",
        "durationSeconds": 180,
        "speed": 6.0,
        "incline": 0.0
      }
    ]
  },
  {
    "name": "Cardio HIIT",
    "description": "Classic 30-on/30-off very-high-effort intervals at elevated speed.",
    "difficulty": "intense",
    "workoutType": "hiit",
    "trainingObjective": "Time-efficient, high cardiovascular demand.",
    "intervals": [
      {
        "name": "Warm Up",
        "durationSeconds": 180,
        "speed": 8.0,
        "incline": 0.0
      },
      {
        "name": "Effort",
        "durationSeconds": 30,
        "speed": 12.0,
        "incline": 0.0,
        "instruction": "Push hard — 12.0 km/h"
      },
      {
        "name": "Recover",
        "durationSeconds": 30,
        "speed": 8.0,
        "incline": 0.0
      },
      {
        "name": "Effort",
        "durationSeconds": 30,
        "speed": 12.0,
        "incline": 0.0,
        "instruction": "Push hard — 12.0 km/h"
      },
      {
        "name": "Recover",
        "durationSeconds": 30,
        "speed": 8.0,
        "incline": 0.0
      },
      {
        "name": "Effort",
        "durationSeconds": 30,
        "speed": 12.0,
        "incline": 0.0,
        "instruction": "Push hard — 12.0 km/h"
      },
      {
        "name": "Recover",
        "durationSeconds": 30,
        "speed": 8.0,
        "incline": 0.0
      },
      {
        "name": "Effort",
        "durationSeconds": 30,
        "speed": 12.0,
        "incline": 0.0,
        "instruction": "Push hard — 12.0 km/h"
      },
      {
        "name": "Recover",
        "durationSeconds": 30,
        "speed": 8.0,
        "incline": 0.0
      },
      {
        "name": "Effort",
        "durationSeconds": 30,
        "speed": 12.0,
        "incline": 0.0,
        "instruction": "Push hard — 12.0 km/h"
      },
      {
        "name": "Recover",
        "durationSeconds": 30,
        "speed": 8.0,
        "incline": 0.0
      },
      {
        "name": "Cool Down",
        "durationSeconds": 180,
        "speed": 6.0,
        "incline": 0.0
      }
    ]
  },
  {
    "name": "Short High-Intensity Intervals",
    "description": "Very short maximal efforts with generous recovery, higher rep count.",
    "difficulty": "intense",
    "workoutType": "hiit",
    "trainingObjective": "Anaerobic power focus.",
    "intervals": [
      {
        "name": "Warm Up",
        "durationSeconds": 180,
        "speed": 8.0,
        "incline": 0.0
      },
      {
        "name": "Max Effort",
        "durationSeconds": 20,
        "speed": 10.0,
        "incline": 0.0,
        "instruction": "Max effort — 10.0 km/h"
      },
      {
        "name": "Recover",
        "durationSeconds": 60,
        "speed": 8.0,
        "incline": 0.0
      },
      {
        "name": "Max Effort",
        "durationSeconds": 20,
        "speed": 12.0,
        "incline": 0.0,
        "instruction": "Max effort — 12.0 km/h"
      },
      {
        "name": "Recover",
        "durationSeconds": 60,
        "speed": 8.0,
        "incline": 0.0
      },
      {
        "name": "Max Effort",
        "durationSeconds": 20,
        "speed": 10.0,
        "incline": 0.0,
        "instruction": "Max effort — 10.0 km/h"
      },
      {
        "name": "Recover",
        "durationSeconds": 60,
        "speed": 8.0,
        "incline": 0.0
      },
      {
        "name": "Max Effort",
        "durationSeconds": 20,
        "speed": 12.0,
        "incline": 0.0,
        "instruction": "Max effort — 12.0 km/h"
      },
      {
        "name": "Recover",
        "durationSeconds": 60,
        "speed": 8.0,
        "incline": 0.0
      },
      {
        "name": "Max Effort",
        "durationSeconds": 20,
        "speed": 10.0,
        "incline": 0.0,
        "instruction": "Max effort — 10.0 km/h"
      },
      {
        "name": "Recover",
        "durationSeconds": 60,
        "speed": 8.0,
        "incline": 0.0
      },
      {
        "name": "Cool Down",
        "durationSeconds": 180,
        "speed": 6.0,
        "incline": 0.0
      }
    ]
  },
  {
    "name": "Peak Sprint Workout",
    "description": "Combines short max-effort sprints with a peak incline block near the end.",
    "difficulty": "intense",
    "workoutType": "speed",
    "trainingObjective": "A more demanding program in the library — experienced users only.",
    "intervals": [
      {
        "name": "Warm Up",
        "durationSeconds": 180,
        "speed": 8.0,
        "incline": 0.0
      },
      {
        "name": "Sprint",
        "durationSeconds": 20,
        "speed": 12.0,
        "incline": 0.0,
        "instruction": "Sprint — 12.0 km/h"
      },
      {
        "name": "Recover",
        "durationSeconds": 60,
        "speed": 6.0,
        "incline": 0.0
      },
      {
        "name": "Sprint",
        "durationSeconds": 20,
        "speed": 12.0,
        "incline": 0.0,
        "instruction": "Sprint — 12.0 km/h"
      },
      {
        "name": "Recover",
        "durationSeconds": 60,
        "speed": 6.0,
        "incline": 0.0
      },
      {
        "name": "Sprint",
        "durationSeconds": 20,
        "speed": 12.0,
        "incline": 0.0,
        "instruction": "Sprint — 12.0 km/h"
      },
      {
        "name": "Recover",
        "durationSeconds": 60,
        "speed": 6.0,
        "incline": 0.0
      },
      {
        "name": "Sprint",
        "durationSeconds": 20,
        "speed": 12.0,
        "incline": 0.0,
        "instruction": "Sprint — 12.0 km/h"
      },
      {
        "name": "Recover",
        "durationSeconds": 60,
        "speed": 6.0,
        "incline": 0.0
      },
      {
        "name": "Peak Incline",
        "durationSeconds": 120,
        "speed": 8.0,
        "incline": 8.0,
        "instruction": "Incline to 8%"
      },
      {
        "name": "Cool Down",
        "durationSeconds": 240,
        "speed": 6.0,
        "incline": 0.0
      }
    ]
  },
  {
    "name": "Express Cardio Blast",
    "description": "A brisk 8-minute cardio hit for when you're short on time but still want your heart rate up.",
    "difficulty": "moderate",
    "workoutType": "cardio",
    "trainingObjective": "Fast aerobic stimulus in a minimal time window.",
    "intervals": [
      {
        "name": "Warm Up",
        "durationSeconds": 60,
        "speed": 5.0,
        "incline": 0.0
      },
      {
        "name": "Cardio Push",
        "durationSeconds": 120,
        "speed": 7.5,
        "incline": 1.0
      },
      {
        "name": "Cardio Push",
        "durationSeconds": 120,
        "speed": 8.0,
        "incline": 1.0,
        "instruction": "Hold this pace"
      },
      {
        "name": "Cardio Push",
        "durationSeconds": 120,
        "speed": 7.5,
        "incline": 1.0
      },
      {
        "name": "Cool Down",
        "durationSeconds": 60,
        "speed": 4.5,
        "incline": 0.0,
        "instruction": "Reduce incline to 0%"
      }
    ]
  },
  {
    "name": "Quick HIIT Sprint",
    "description": "Four short sprints packed into 9 minutes — high effort, high reward.",
    "difficulty": "hard",
    "workoutType": "hiit",
    "trainingObjective": "Anaerobic conditioning via short maximal-effort bursts.",
    "intervals": [
      {
        "name": "Warm Up",
        "durationSeconds": 90,
        "speed": 5.5,
        "incline": 0.0
      },
      {
        "name": "Sprint",
        "durationSeconds": 30,
        "speed": 12.0,
        "incline": 0.0,
        "instruction": "Sprint!"
      },
      {
        "name": "Recovery",
        "durationSeconds": 60,
        "speed": 6.0,
        "incline": 0.0
      },
      {
        "name": "Sprint",
        "durationSeconds": 30,
        "speed": 12.5,
        "incline": 0.0,
        "instruction": "Sprint!"
      },
      {
        "name": "Recovery",
        "durationSeconds": 60,
        "speed": 6.0,
        "incline": 0.0
      },
      {
        "name": "Sprint",
        "durationSeconds": 30,
        "speed": 13.0,
        "incline": 0.0,
        "instruction": "Sprint!"
      },
      {
        "name": "Recovery",
        "durationSeconds": 60,
        "speed": 6.0,
        "incline": 0.0
      },
      {
        "name": "Sprint",
        "durationSeconds": 30,
        "speed": 13.0,
        "incline": 0.0,
        "instruction": "Final sprint!"
      },
      {
        "name": "Cool Down",
        "durationSeconds": 150,
        "speed": 5.0,
        "incline": 0.0
      }
    ]
  },
  {
    "name": "Speed Snap",
    "description": "A 9-minute speed ladder that builds to a peak pace and back down.",
    "difficulty": "intense",
    "workoutType": "speed",
    "trainingObjective": "Improves top-end running speed and pace tolerance.",
    "intervals": [
      {
        "name": "Warm Up",
        "durationSeconds": 60,
        "speed": 6.0,
        "incline": 0.0
      },
      {
        "name": "Speed Build",
        "durationSeconds": 90,
        "speed": 9.0,
        "incline": 0.0
      },
      {
        "name": "Speed Push",
        "durationSeconds": 90,
        "speed": 10.5,
        "incline": 0.0
      },
      {
        "name": "Peak Speed",
        "durationSeconds": 60,
        "speed": 12.0,
        "incline": 0.0,
        "instruction": "Push to your max sustainable speed"
      },
      {
        "name": "Speed Push",
        "durationSeconds": 90,
        "speed": 10.5,
        "incline": 0.0
      },
      {
        "name": "Speed Build",
        "durationSeconds": 90,
        "speed": 9.0,
        "incline": 0.0
      },
      {
        "name": "Cool Down",
        "durationSeconds": 60,
        "speed": 5.0,
        "incline": 0.0
      }
    ]
  },
  {
    "name": "Micro Recovery Walk",
    "description": "A gentle 8-minute walk with a touch of incline — ideal for active recovery days or a quick break.",
    "difficulty": "easy",
    "workoutType": "recovery",
    "trainingObjective": "Promotes blood flow and recovery without added strain.",
    "intervals": [
      {
        "name": "Easy Start",
        "durationSeconds": 60,
        "speed": 4.0,
        "incline": 0.0
      },
      {
        "name": "Steady Walk",
        "durationSeconds": 180,
        "speed": 4.5,
        "incline": 2.0
      },
      {
        "name": "Gentle Incline",
        "durationSeconds": 120,
        "speed": 4.0,
        "incline": 4.0,
        "instruction": "Increase incline to 4%"
      },
      {
        "name": "Wind Down",
        "durationSeconds": 120,
        "speed": 3.5,
        "incline": 0.0,
        "instruction": "Reduce incline to 0%"
      }
    ]
  },
  {
    "name": "Speed Introduction",
    "description": "A gentle introduction to speed work with a steady ramp up and back down in pace — a good way to get comfortable running faster on the treadmill while the pace changes help burn fat.",
    "difficulty": "easy",
    "workoutType": "speed",
    "trainingObjective": "A gentle introduction to speed work with a steady ramp up and back down in pace — a good way to get comfortable running faster on the treadmill while the pace changes help burn fat.",
    "intervals": [
      {
        "name": "Warm Up",
        "durationSeconds": 144,
        "speed": 5.0,
        "incline": 0.0,
        "instruction": "Speed to 5.0 km/h"
      },
      {
        "name": "Hold",
        "durationSeconds": 144,
        "speed": 5.0,
        "incline": 0.0
      },
      {
        "name": "Push",
        "durationSeconds": 120,
        "speed": 6.0,
        "incline": 0.0,
        "instruction": "Speed to 6.0 km/h"
      },
      {
        "name": "Push",
        "durationSeconds": 103,
        "speed": 7.0,
        "incline": 0.0,
        "instruction": "Speed to 7.0 km/h"
      },
      {
        "name": "Push",
        "durationSeconds": 90,
        "speed": 8.0,
        "incline": 0.0,
        "instruction": "Speed to 8.0 km/h"
      },
      {
        "name": "Push",
        "durationSeconds": 80,
        "speed": 9.0,
        "incline": 0.0,
        "instruction": "Speed to 9.0 km/h"
      },
      {
        "name": "Peak Effort",
        "durationSeconds": 80,
        "speed": 9.0,
        "incline": 0.0
      },
      {
        "name": "Recovery",
        "durationSeconds": 90,
        "speed": 8.0,
        "incline": 0.0,
        "instruction": "Speed to 8.0 km/h"
      },
      {
        "name": "Recovery",
        "durationSeconds": 103,
        "speed": 7.0,
        "incline": 0.0,
        "instruction": "Speed to 7.0 km/h"
      },
      {
        "name": "Cool Down",
        "durationSeconds": 120,
        "speed": 6.0,
        "incline": 0.0,
        "instruction": "Speed to 6.0 km/h"
      }
    ]
  },
  {
    "name": "Rolling Hills",
    "description": "Alternates between two incline levels to mimic walking or running over gentle rolling hills, engaging the stabiliser muscles in the legs for a well-rounded lower-body workout. Speed is a recommendation only — feel free to set your own pace; the incline pattern is what this program is built around.",
    "difficulty": "easy",
    "workoutType": "incline",
    "trainingObjective": "Alternates between two incline levels to mimic walking or running over gentle rolling hills, engaging the stabiliser muscles in the legs for a well-rounded lower-body workout.",
    "intervals": [
      {
        "name": "Warm Up",
        "durationSeconds": 180,
        "speed": 4.0,
        "incline": 0.0,
        "instruction": "Incline to 0%"
      },
      {
        "name": "Climb",
        "durationSeconds": 180,
        "speed": 4.0,
        "incline": 7.0,
        "instruction": "Incline to 7%"
      },
      {
        "name": "Descent",
        "durationSeconds": 180,
        "speed": 4.0,
        "incline": 5.0,
        "instruction": "Incline to 5%"
      },
      {
        "name": "Climb",
        "durationSeconds": 180,
        "speed": 4.0,
        "incline": 7.0,
        "instruction": "Incline to 7%"
      },
      {
        "name": "Descent",
        "durationSeconds": 180,
        "speed": 4.0,
        "incline": 5.0,
        "instruction": "Incline to 5%"
      },
      {
        "name": "Climb",
        "durationSeconds": 180,
        "speed": 4.0,
        "incline": 7.0,
        "instruction": "Incline to 7%"
      },
      {
        "name": "Descent",
        "durationSeconds": 180,
        "speed": 4.0,
        "incline": 5.0,
        "instruction": "Incline to 5%"
      },
      {
        "name": "Climb",
        "durationSeconds": 180,
        "speed": 4.0,
        "incline": 7.0,
        "instruction": "Incline to 7%"
      },
      {
        "name": "Descent",
        "durationSeconds": 180,
        "speed": 4.0,
        "incline": 5.0,
        "instruction": "Incline to 5%"
      },
      {
        "name": "Final Climb",
        "durationSeconds": 180,
        "speed": 4.0,
        "incline": 7.0,
        "instruction": "Incline to 7%"
      }
    ]
  },
  {
    "name": "Hill Endurance",
    "description": "Combines a steady pace with varying incline to build stamina and endurance, training the body to sustain effort for longer.",
    "difficulty": "easy",
    "workoutType": "mixed",
    "trainingObjective": "Combines a steady pace with varying incline to build stamina and endurance, training the body to sustain effort for longer.",
    "intervals": [
      {
        "name": "Warm Up",
        "durationSeconds": 144,
        "speed": 5.0,
        "incline": 1.0,
        "instruction": "Adjust speed to 5.0 km/h and incline to 1%"
      },
      {
        "name": "Push",
        "durationSeconds": 144,
        "speed": 5.0,
        "incline": 2.0,
        "instruction": "Adjust incline to 2%"
      },
      {
        "name": "Push",
        "durationSeconds": 120,
        "speed": 6.0,
        "incline": 2.0,
        "instruction": "Adjust speed to 6.0 km/h"
      },
      {
        "name": "Push",
        "durationSeconds": 103,
        "speed": 7.0,
        "incline": 4.0,
        "instruction": "Adjust speed to 7.0 km/h and incline to 4%"
      },
      {
        "name": "Push",
        "durationSeconds": 90,
        "speed": 8.0,
        "incline": 5.0,
        "instruction": "Adjust speed to 8.0 km/h and incline to 5%"
      },
      {
        "name": "Push",
        "durationSeconds": 90,
        "speed": 8.0,
        "incline": 7.0,
        "instruction": "Adjust incline to 7%"
      },
      {
        "name": "Recovery",
        "durationSeconds": 90,
        "speed": 8.0,
        "incline": 5.0,
        "instruction": "Adjust incline to 5%"
      },
      {
        "name": "Peak Effort",
        "durationSeconds": 90,
        "speed": 8.0,
        "incline": 7.0,
        "instruction": "Adjust incline to 7%"
      },
      {
        "name": "Recovery",
        "durationSeconds": 103,
        "speed": 7.0,
        "incline": 4.0,
        "instruction": "Adjust speed to 7.0 km/h and incline to 4%"
      },
      {
        "name": "Cool Down",
        "durationSeconds": 120,
        "speed": 6.0,
        "incline": 2.0,
        "instruction": "Adjust speed to 6.0 km/h and incline to 2%"
      }
    ]
  },
  {
    "name": "Fast Hills",
    "description": "Uses lower inclines paired with higher speeds to recreate the feel of hill running — aimed at fat burning and building lean lower-body muscle.",
    "difficulty": "easy",
    "workoutType": "mixed",
    "trainingObjective": "Uses lower inclines paired with higher speeds to recreate the feel of hill running — aimed at fat burning and building lean lower-body muscle.",
    "intervals": [
      {
        "name": "Warm Up",
        "durationSeconds": 103,
        "speed": 7.0,
        "incline": 1.0,
        "instruction": "Adjust speed to 7.0 km/h and incline to 1%"
      },
      {
        "name": "Push",
        "durationSeconds": 90,
        "speed": 8.0,
        "incline": 2.0,
        "instruction": "Adjust speed to 8.0 km/h and incline to 2%"
      },
      {
        "name": "Push",
        "durationSeconds": 80,
        "speed": 9.0,
        "incline": 2.0,
        "instruction": "Adjust speed to 9.0 km/h"
      },
      {
        "name": "Climb",
        "durationSeconds": 90,
        "speed": 8.0,
        "incline": 4.0,
        "instruction": "Adjust speed to 8.0 km/h and incline to 4%"
      },
      {
        "name": "Climb",
        "durationSeconds": 103,
        "speed": 7.0,
        "incline": 5.0,
        "instruction": "Adjust speed to 7.0 km/h and incline to 5%"
      },
      {
        "name": "Recovery",
        "durationSeconds": 144,
        "speed": 5.0,
        "incline": 5.0,
        "instruction": "Adjust speed to 5.0 km/h"
      },
      {
        "name": "Climb",
        "durationSeconds": 144,
        "speed": 5.0,
        "incline": 6.0,
        "instruction": "Adjust incline to 6%"
      },
      {
        "name": "Climb",
        "durationSeconds": 144,
        "speed": 5.0,
        "incline": 7.0,
        "instruction": "Adjust incline to 7%"
      },
      {
        "name": "Recovery",
        "durationSeconds": 144,
        "speed": 5.0,
        "incline": 4.0,
        "instruction": "Adjust incline to 4%"
      },
      {
        "name": "Cool Down",
        "durationSeconds": 120,
        "speed": 6.0,
        "incline": 2.0,
        "instruction": "Adjust speed to 6.0 km/h and incline to 2%"
      }
    ]
  },
  {
    "name": "Positive Split Sprint",
    "description": "Pushes hard through the first half before easing off to recover, finishing with a final sprint — designed to improve overall speed and torch calories.",
    "difficulty": "moderate",
    "workoutType": "speed",
    "trainingObjective": "Pushes hard through the first half before easing off to recover, finishing with a final sprint — designed to improve overall speed and torch calories.",
    "intervals": [
      {
        "name": "Warm Up",
        "durationSeconds": 144,
        "speed": 5.0,
        "incline": 0.0,
        "instruction": "Speed to 5.0 km/h"
      },
      {
        "name": "Push",
        "durationSeconds": 51,
        "speed": 14.0,
        "incline": 0.0,
        "instruction": "Speed to 14.0 km/h"
      },
      {
        "name": "Hold",
        "durationSeconds": 51,
        "speed": 14.0,
        "incline": 0.0
      },
      {
        "name": "Recovery",
        "durationSeconds": 60,
        "speed": 12.0,
        "incline": 0.0,
        "instruction": "Speed to 12.0 km/h"
      },
      {
        "name": "Recovery",
        "durationSeconds": 65,
        "speed": 11.0,
        "incline": 0.0,
        "instruction": "Speed to 11.0 km/h"
      },
      {
        "name": "Recovery",
        "durationSeconds": 80,
        "speed": 9.0,
        "incline": 0.0,
        "instruction": "Speed to 9.0 km/h"
      },
      {
        "name": "Recovery",
        "durationSeconds": 103,
        "speed": 7.0,
        "incline": 0.0,
        "instruction": "Speed to 7.0 km/h"
      },
      {
        "name": "Recovery",
        "durationSeconds": 120,
        "speed": 6.0,
        "incline": 0.0,
        "instruction": "Speed to 6.0 km/h"
      },
      {
        "name": "Recovery",
        "durationSeconds": 144,
        "speed": 5.0,
        "incline": 0.0,
        "instruction": "Speed to 5.0 km/h"
      },
      {
        "name": "Final Push",
        "durationSeconds": 51,
        "speed": 14.0,
        "incline": 0.0,
        "instruction": "Speed to 14.0 km/h"
      }
    ]
  },
  {
    "name": "Mountain Climber",
    "description": "Takes incline training up a notch with alternating steep climbs and brief recovery sections, building muscle through the calves, thighs, and glutes. Speed is a recommendation only — feel free to set your own pace; the incline pattern is what this program is built around.",
    "difficulty": "moderate",
    "workoutType": "incline",
    "trainingObjective": "Takes incline training up a notch with alternating steep climbs and brief recovery sections, building muscle through the calves, thighs, and glutes.",
    "intervals": [
      {
        "name": "Warm Up",
        "durationSeconds": 144,
        "speed": 5.0,
        "incline": 0.0,
        "instruction": "Incline to 0%"
      },
      {
        "name": "Climb",
        "durationSeconds": 144,
        "speed": 5.0,
        "incline": 13.0,
        "instruction": "Incline to 13%"
      },
      {
        "name": "Hold",
        "durationSeconds": 144,
        "speed": 5.0,
        "incline": 13.0
      },
      {
        "name": "Descent",
        "durationSeconds": 144,
        "speed": 5.0,
        "incline": 11.0,
        "instruction": "Incline to 11%"
      },
      {
        "name": "Climb",
        "durationSeconds": 144,
        "speed": 5.0,
        "incline": 13.0,
        "instruction": "Incline to 13%"
      },
      {
        "name": "Climb",
        "durationSeconds": 144,
        "speed": 5.0,
        "incline": 13.0
      },
      {
        "name": "Descent",
        "durationSeconds": 144,
        "speed": 5.0,
        "incline": 11.0,
        "instruction": "Incline to 11%"
      },
      {
        "name": "Climb",
        "durationSeconds": 144,
        "speed": 5.0,
        "incline": 13.0,
        "instruction": "Incline to 13%"
      },
      {
        "name": "Hold",
        "durationSeconds": 144,
        "speed": 5.0,
        "incline": 13.0
      },
      {
        "name": "Cool Down",
        "durationSeconds": 144,
        "speed": 5.0,
        "incline": 11.0,
        "instruction": "Incline to 11%"
      }
    ]
  },
  {
    "name": "Mountain Runner",
    "description": "Starts fast at a low incline and slows as the climb steepens, toning the legs while the higher inclines work to elevate heart rate.",
    "difficulty": "moderate",
    "workoutType": "mixed",
    "trainingObjective": "Starts fast at a low incline and slows as the climb steepens, toning the legs while the higher inclines work to elevate heart rate.",
    "intervals": [
      {
        "name": "Warm Up",
        "durationSeconds": 80,
        "speed": 9.0,
        "incline": 1.0,
        "instruction": "Adjust speed to 9.0 km/h and incline to 1%"
      },
      {
        "name": "Push",
        "durationSeconds": 55,
        "speed": 13.0,
        "incline": 5.0,
        "instruction": "Adjust speed to 13.0 km/h and incline to 5%"
      },
      {
        "name": "Push",
        "durationSeconds": 51,
        "speed": 14.0,
        "incline": 5.0,
        "instruction": "Adjust speed to 14.0 km/h"
      },
      {
        "name": "Recovery",
        "durationSeconds": 90,
        "speed": 8.0,
        "incline": 7.0,
        "instruction": "Adjust speed to 8.0 km/h and incline to 7%"
      },
      {
        "name": "Push",
        "durationSeconds": 72,
        "speed": 10.0,
        "incline": 10.0,
        "instruction": "Adjust speed to 10.0 km/h and incline to 10%"
      },
      {
        "name": "Recovery",
        "durationSeconds": 90,
        "speed": 8.0,
        "incline": 7.0,
        "instruction": "Adjust speed to 8.0 km/h and incline to 7%"
      },
      {
        "name": "Push",
        "durationSeconds": 90,
        "speed": 8.0,
        "incline": 10.0,
        "instruction": "Adjust incline to 10%"
      },
      {
        "name": "Peak Climb",
        "durationSeconds": 103,
        "speed": 7.0,
        "incline": 13.0,
        "instruction": "Adjust speed to 7.0 km/h and incline to 13%"
      },
      {
        "name": "Recovery",
        "durationSeconds": 90,
        "speed": 8.0,
        "incline": 10.0,
        "instruction": "Adjust speed to 8.0 km/h and incline to 10%"
      },
      {
        "name": "Cool Down",
        "durationSeconds": 90,
        "speed": 8.0,
        "incline": 7.0,
        "instruction": "Adjust incline to 7%"
      }
    ]
  },
  {
    "name": "Uphill Sprint",
    "description": "Balances incline and speed to keep the heart rate high and optimise fat burning, with a moderate incline ceiling so the focus stays on building pace.",
    "difficulty": "moderate",
    "workoutType": "mixed",
    "trainingObjective": "Balances incline and speed to keep the heart rate high and optimise fat burning, with a moderate incline ceiling so the focus stays on building pace.",
    "intervals": [
      {
        "name": "Warm Up",
        "durationSeconds": 90,
        "speed": 8.0,
        "incline": 0.0,
        "instruction": "Adjust speed to 8.0 km/h and incline to 0%"
      },
      {
        "name": "Climb",
        "durationSeconds": 103,
        "speed": 7.0,
        "incline": 5.0,
        "instruction": "Adjust speed to 7.0 km/h and incline to 5%"
      },
      {
        "name": "Push",
        "durationSeconds": 90,
        "speed": 8.0,
        "incline": 5.0,
        "instruction": "Adjust speed to 8.0 km/h"
      },
      {
        "name": "Push",
        "durationSeconds": 80,
        "speed": 9.0,
        "incline": 7.0,
        "instruction": "Adjust speed to 9.0 km/h and incline to 7%"
      },
      {
        "name": "Push",
        "durationSeconds": 72,
        "speed": 10.0,
        "incline": 10.0,
        "instruction": "Adjust speed to 10.0 km/h and incline to 10%"
      },
      {
        "name": "Hold",
        "durationSeconds": 72,
        "speed": 10.0,
        "incline": 10.0
      },
      {
        "name": "Push",
        "durationSeconds": 65,
        "speed": 11.0,
        "incline": 7.0,
        "instruction": "Adjust speed to 11.0 km/h and incline to 7%"
      },
      {
        "name": "Push",
        "durationSeconds": 60,
        "speed": 12.0,
        "incline": 8.0,
        "instruction": "Adjust speed to 12.0 km/h and incline to 8%"
      },
      {
        "name": "Peak Effort",
        "durationSeconds": 51,
        "speed": 14.0,
        "incline": 3.0,
        "instruction": "Adjust speed to 14.0 km/h and incline to 3%"
      },
      {
        "name": "Steady Finish",
        "durationSeconds": 60,
        "speed": 12.0,
        "incline": 6.0,
        "instruction": "Adjust speed to 12.0 km/h and incline to 6%"
      }
    ]
  },
  {
    "name": "Explosive Sprint",
    "description": "Opens at top speed and gradually eases off before finishing with another all-out sprint — built to develop explosive power and push overall speed limits.",
    "difficulty": "intense",
    "workoutType": "speed",
    "trainingObjective": "Opens at top speed and gradually eases off before finishing with another all-out sprint — built to develop explosive power and push overall speed limits.",
    "intervals": [
      {
        "name": "Warm Up",
        "durationSeconds": 103,
        "speed": 7.0,
        "incline": 0.0,
        "instruction": "Speed to 7.0 km/h"
      },
      {
        "name": "Push",
        "durationSeconds": 45,
        "speed": 16.0,
        "incline": 0.0,
        "instruction": "Speed to 16.0 km/h"
      },
      {
        "name": "Recovery",
        "durationSeconds": 51,
        "speed": 14.0,
        "incline": 0.0,
        "instruction": "Speed to 14.0 km/h"
      },
      {
        "name": "Recovery",
        "durationSeconds": 60,
        "speed": 12.0,
        "incline": 0.0,
        "instruction": "Speed to 12.0 km/h"
      },
      {
        "name": "Recovery",
        "durationSeconds": 65,
        "speed": 11.0,
        "incline": 0.0,
        "instruction": "Speed to 11.0 km/h"
      },
      {
        "name": "Recovery",
        "durationSeconds": 72,
        "speed": 10.0,
        "incline": 0.0,
        "instruction": "Speed to 10.0 km/h"
      },
      {
        "name": "Recovery",
        "durationSeconds": 80,
        "speed": 9.0,
        "incline": 0.0,
        "instruction": "Speed to 9.0 km/h"
      },
      {
        "name": "Hold",
        "durationSeconds": 80,
        "speed": 9.0,
        "incline": 0.0
      },
      {
        "name": "Recovery",
        "durationSeconds": 103,
        "speed": 7.0,
        "incline": 0.0,
        "instruction": "Speed to 7.0 km/h"
      },
      {
        "name": "Final Push",
        "durationSeconds": 45,
        "speed": 16.0,
        "incline": 0.0,
        "instruction": "Speed to 16.0 km/h"
      }
    ]
  },
  {
    "name": "Everest Climber",
    "description": "Takes on some of the steepest inclines in the library, targeting serious lower-body strength across the calves, glutes, and thighs. Speed is a recommendation only — feel free to set your own pace; the incline pattern is what this program is built around.",
    "difficulty": "hard",
    "workoutType": "incline",
    "trainingObjective": "Takes on some of the steepest inclines in the library, targeting serious lower-body strength across the calves, glutes, and thighs.",
    "intervals": [
      {
        "name": "Warm Up",
        "durationSeconds": 144,
        "speed": 5.0,
        "incline": 0.0,
        "instruction": "Incline to 0%"
      },
      {
        "name": "Climb",
        "durationSeconds": 144,
        "speed": 5.0,
        "incline": 16.0,
        "instruction": "Incline to 16%"
      },
      {
        "name": "Climb",
        "durationSeconds": 144,
        "speed": 5.0,
        "incline": 17.0,
        "instruction": "Incline to 17%"
      },
      {
        "name": "Climb",
        "durationSeconds": 144,
        "speed": 5.0,
        "incline": 20.0,
        "instruction": "Incline to 20%"
      },
      {
        "name": "Recovery",
        "durationSeconds": 144,
        "speed": 5.0,
        "incline": 17.0,
        "instruction": "Incline to 17%"
      },
      {
        "name": "Climb",
        "durationSeconds": 144,
        "speed": 5.0,
        "incline": 20.0,
        "instruction": "Incline to 20%"
      },
      {
        "name": "Recovery",
        "durationSeconds": 144,
        "speed": 5.0,
        "incline": 17.0,
        "instruction": "Incline to 17%"
      },
      {
        "name": "Climb",
        "durationSeconds": 144,
        "speed": 5.0,
        "incline": 20.0,
        "instruction": "Incline to 20%"
      },
      {
        "name": "Recovery",
        "durationSeconds": 144,
        "speed": 5.0,
        "incline": 17.0,
        "instruction": "Incline to 17%"
      },
      {
        "name": "Cool Down",
        "durationSeconds": 144,
        "speed": 5.0,
        "incline": 12.0,
        "instruction": "Incline to 12%"
      }
    ]
  },
  {
    "name": "Everest Runner",
    "description": "A demanding mix of steep inclines and strong pace changes, designed to spike the heart rate, build explosive leg power, and test overall limits.",
    "difficulty": "intense",
    "workoutType": "mixed",
    "trainingObjective": "A demanding mix of steep inclines and strong pace changes, designed to spike the heart rate, build explosive leg power, and test overall limits.",
    "intervals": [
      {
        "name": "Warm Up",
        "durationSeconds": 72,
        "speed": 10.0,
        "incline": 5.0,
        "instruction": "Adjust speed to 10.0 km/h and incline to 5%"
      },
      {
        "name": "Push",
        "durationSeconds": 48,
        "speed": 15.0,
        "incline": 7.0,
        "instruction": "Adjust speed to 15.0 km/h and incline to 7%"
      },
      {
        "name": "Climb",
        "durationSeconds": 51,
        "speed": 14.0,
        "incline": 14.0,
        "instruction": "Adjust speed to 14.0 km/h and incline to 14%"
      },
      {
        "name": "Climb",
        "durationSeconds": 60,
        "speed": 12.0,
        "incline": 17.0,
        "instruction": "Adjust speed to 12.0 km/h and incline to 17%"
      },
      {
        "name": "Peak Climb",
        "durationSeconds": 65,
        "speed": 11.0,
        "incline": 20.0,
        "instruction": "Adjust speed to 11.0 km/h and incline to 20%"
      },
      {
        "name": "Recovery",
        "durationSeconds": 90,
        "speed": 8.0,
        "incline": 5.0,
        "instruction": "Adjust speed to 8.0 km/h and incline to 5%"
      },
      {
        "name": "Push",
        "durationSeconds": 72,
        "speed": 10.0,
        "incline": 13.0,
        "instruction": "Adjust speed to 10.0 km/h and incline to 13%"
      },
      {
        "name": "Climb",
        "durationSeconds": 72,
        "speed": 10.0,
        "incline": 15.0,
        "instruction": "Adjust incline to 15%"
      },
      {
        "name": "Recovery",
        "durationSeconds": 90,
        "speed": 8.0,
        "incline": 10.0,
        "instruction": "Adjust speed to 8.0 km/h and incline to 10%"
      },
      {
        "name": "Steady Finish",
        "durationSeconds": 48,
        "speed": 15.0,
        "incline": 8.0,
        "instruction": "Adjust speed to 15.0 km/h and incline to 8%"
      }
    ]
  },
  {
    "name": "Interval Sprints",
    "description": "Pairs high-speed efforts with rest intervals and rising incline to build leg power and push past comfort zones.",
    "difficulty": "intense",
    "workoutType": "mixed",
    "trainingObjective": "Pairs high-speed efforts with rest intervals and rising incline to build leg power and push past comfort zones.",
    "intervals": [
      {
        "name": "Warm Up",
        "durationSeconds": 72,
        "speed": 10.0,
        "incline": 5.0,
        "instruction": "Adjust speed to 10.0 km/h and incline to 5%"
      },
      {
        "name": "Push",
        "durationSeconds": 65,
        "speed": 11.0,
        "incline": 7.0,
        "instruction": "Adjust speed to 11.0 km/h and incline to 7%"
      },
      {
        "name": "Push",
        "durationSeconds": 55,
        "speed": 13.0,
        "incline": 14.0,
        "instruction": "Adjust speed to 13.0 km/h and incline to 14%"
      },
      {
        "name": "Recovery",
        "durationSeconds": 60,
        "speed": 12.0,
        "incline": 14.0,
        "instruction": "Adjust speed to 12.0 km/h"
      },
      {
        "name": "Push on Descent",
        "durationSeconds": 48,
        "speed": 15.0,
        "incline": 7.0,
        "instruction": "Adjust speed to 15.0 km/h and incline to 7%"
      },
      {
        "name": "Recovery",
        "durationSeconds": 72,
        "speed": 10.0,
        "incline": 5.0,
        "instruction": "Adjust speed to 10.0 km/h and incline to 5%"
      },
      {
        "name": "Push",
        "durationSeconds": 60,
        "speed": 12.0,
        "incline": 13.0,
        "instruction": "Adjust speed to 12.0 km/h and incline to 13%"
      },
      {
        "name": "Push on Descent",
        "durationSeconds": 72,
        "speed": 10.0,
        "incline": 15.0,
        "instruction": "Adjust speed to 10.0 km/h and incline to 15%"
      },
      {
        "name": "Recovery",
        "durationSeconds": 120,
        "speed": 6.0,
        "incline": 5.0,
        "instruction": "Adjust speed to 6.0 km/h and incline to 5%"
      },
      {
        "name": "Strong Finish",
        "durationSeconds": 45,
        "speed": 16.0,
        "incline": 5.0,
        "instruction": "Adjust speed to 16.0 km/h"
      }
    ]
  },
  {
    "name": "Beginner HIIT",
    "description": "An easy entry point into HIIT training, alternating brisk and easy paces to build the habit without overwhelming intensity.",
    "difficulty": "easy",
    "workoutType": "hiit",
    "trainingObjective": "An easy entry point into HIIT training, alternating brisk and easy paces to build the habit without overwhelming intensity.",
    "intervals": [
      {
        "name": "Opening Surge",
        "durationSeconds": 80,
        "speed": 9.0,
        "incline": 0.0,
        "instruction": "Speed to 9.0 km/h"
      },
      {
        "name": "Recovery",
        "durationSeconds": 240,
        "speed": 3.0,
        "incline": 0.0,
        "instruction": "Speed to 3.0 km/h"
      },
      {
        "name": "Surge",
        "durationSeconds": 80,
        "speed": 9.0,
        "incline": 0.0,
        "instruction": "Speed to 9.0 km/h"
      },
      {
        "name": "Recovery",
        "durationSeconds": 240,
        "speed": 3.0,
        "incline": 0.0,
        "instruction": "Speed to 3.0 km/h"
      },
      {
        "name": "Peak Effort",
        "durationSeconds": 80,
        "speed": 9.0,
        "incline": 0.0,
        "instruction": "Speed to 9.0 km/h"
      },
      {
        "name": "Recovery",
        "durationSeconds": 240,
        "speed": 3.0,
        "incline": 0.0,
        "instruction": "Speed to 3.0 km/h"
      },
      {
        "name": "Surge",
        "durationSeconds": 80,
        "speed": 9.0,
        "incline": 0.0,
        "instruction": "Speed to 9.0 km/h"
      },
      {
        "name": "Recovery",
        "durationSeconds": 240,
        "speed": 3.0,
        "incline": 0.0,
        "instruction": "Speed to 3.0 km/h"
      },
      {
        "name": "Surge",
        "durationSeconds": 80,
        "speed": 9.0,
        "incline": 0.0,
        "instruction": "Speed to 9.0 km/h"
      },
      {
        "name": "Cool Down",
        "durationSeconds": 240,
        "speed": 3.0,
        "incline": 0.0,
        "instruction": "Speed to 3.0 km/h"
      }
    ]
  },
  {
    "name": "Intermediate HIIT",
    "description": "Steps HIIT training up a level, testing limits with a bigger contrast between hard and easy paces to accelerate weight loss and conditioning.",
    "difficulty": "moderate",
    "workoutType": "hiit",
    "trainingObjective": "Steps HIIT training up a level, testing limits with a bigger contrast between hard and easy paces to accelerate weight loss and conditioning.",
    "intervals": [
      {
        "name": "Opening Surge",
        "durationSeconds": 60,
        "speed": 12.0,
        "incline": 0.0,
        "instruction": "Speed to 12.0 km/h"
      },
      {
        "name": "Recovery",
        "durationSeconds": 144,
        "speed": 5.0,
        "incline": 0.0,
        "instruction": "Speed to 5.0 km/h"
      },
      {
        "name": "Surge",
        "durationSeconds": 60,
        "speed": 12.0,
        "incline": 0.0,
        "instruction": "Speed to 12.0 km/h"
      },
      {
        "name": "Recovery",
        "durationSeconds": 144,
        "speed": 5.0,
        "incline": 0.0,
        "instruction": "Speed to 5.0 km/h"
      },
      {
        "name": "Peak Effort",
        "durationSeconds": 60,
        "speed": 12.0,
        "incline": 0.0,
        "instruction": "Speed to 12.0 km/h"
      },
      {
        "name": "Recovery",
        "durationSeconds": 144,
        "speed": 5.0,
        "incline": 0.0,
        "instruction": "Speed to 5.0 km/h"
      },
      {
        "name": "Surge",
        "durationSeconds": 60,
        "speed": 12.0,
        "incline": 0.0,
        "instruction": "Speed to 12.0 km/h"
      },
      {
        "name": "Recovery",
        "durationSeconds": 144,
        "speed": 5.0,
        "incline": 0.0,
        "instruction": "Speed to 5.0 km/h"
      },
      {
        "name": "Surge",
        "durationSeconds": 60,
        "speed": 12.0,
        "incline": 0.0,
        "instruction": "Speed to 12.0 km/h"
      },
      {
        "name": "Cool Down",
        "durationSeconds": 144,
        "speed": 5.0,
        "incline": 0.0,
        "instruction": "Speed to 5.0 km/h"
      }
    ]
  },
  {
    "name": "Advanced HIIT",
    "description": "Peak-intensity HIIT with short sprints up to top speed followed by extended recovery, designed to spike heart rate and maximise fat burning.",
    "difficulty": "intense",
    "workoutType": "hiit",
    "trainingObjective": "Peak-intensity HIIT with short sprints up to top speed followed by extended recovery, designed to spike heart rate and maximise fat burning.",
    "intervals": [
      {
        "name": "Opening Surge",
        "durationSeconds": 45,
        "speed": 16.0,
        "incline": 0.0,
        "instruction": "Speed to 16.0 km/h"
      },
      {
        "name": "Recovery",
        "durationSeconds": 90,
        "speed": 8.0,
        "incline": 0.0,
        "instruction": "Speed to 8.0 km/h"
      },
      {
        "name": "Surge",
        "durationSeconds": 45,
        "speed": 16.0,
        "incline": 0.0,
        "instruction": "Speed to 16.0 km/h"
      },
      {
        "name": "Recovery",
        "durationSeconds": 90,
        "speed": 8.0,
        "incline": 0.0,
        "instruction": "Speed to 8.0 km/h"
      },
      {
        "name": "Peak Effort",
        "durationSeconds": 45,
        "speed": 16.0,
        "incline": 0.0,
        "instruction": "Speed to 16.0 km/h"
      },
      {
        "name": "Recovery",
        "durationSeconds": 90,
        "speed": 8.0,
        "incline": 0.0,
        "instruction": "Speed to 8.0 km/h"
      },
      {
        "name": "Surge",
        "durationSeconds": 45,
        "speed": 16.0,
        "incline": 0.0,
        "instruction": "Speed to 16.0 km/h"
      },
      {
        "name": "Recovery",
        "durationSeconds": 90,
        "speed": 8.0,
        "incline": 0.0,
        "instruction": "Speed to 8.0 km/h"
      },
      {
        "name": "Surge",
        "durationSeconds": 45,
        "speed": 16.0,
        "incline": 0.0,
        "instruction": "Speed to 16.0 km/h"
      },
      {
        "name": "Cool Down",
        "durationSeconds": 90,
        "speed": 8.0,
        "incline": 0.0,
        "instruction": "Speed to 8.0 km/h"
      }
    ]
  },
  {
    "name": "Just Walk",
    "description": "A steady walking session that varies pace to stretch the legs and burn calories gently — easy on the joints and equally suited as a warm-up.",
    "difficulty": "easy",
    "workoutType": "cardio",
    "trainingObjective": "A steady walking session that varies pace to stretch the legs and burn calories gently — easy on the joints and equally suited as a warm-up.",
    "intervals": [
      {
        "name": "Warm Up",
        "durationSeconds": 240,
        "speed": 3.0,
        "incline": 0.0,
        "instruction": "Speed to 3.0 km/h"
      },
      {
        "name": "Push",
        "durationSeconds": 144,
        "speed": 5.0,
        "incline": 0.0,
        "instruction": "Speed to 5.0 km/h"
      },
      {
        "name": "Hold",
        "durationSeconds": 144,
        "speed": 5.0,
        "incline": 0.0
      },
      {
        "name": "Recovery",
        "durationSeconds": 240,
        "speed": 3.0,
        "incline": 0.0,
        "instruction": "Speed to 3.0 km/h"
      },
      {
        "name": "Hold",
        "durationSeconds": 240,
        "speed": 3.0,
        "incline": 0.0
      },
      {
        "name": "Push",
        "durationSeconds": 144,
        "speed": 5.0,
        "incline": 0.0,
        "instruction": "Speed to 5.0 km/h"
      },
      {
        "name": "Peak Effort",
        "durationSeconds": 144,
        "speed": 5.0,
        "incline": 0.0
      },
      {
        "name": "Hold",
        "durationSeconds": 144,
        "speed": 5.0,
        "incline": 0.0
      },
      {
        "name": "Hold",
        "durationSeconds": 144,
        "speed": 5.0,
        "incline": 0.0
      },
      {
        "name": "Cool Down",
        "durationSeconds": 180,
        "speed": 4.0,
        "incline": 0.0,
        "instruction": "Speed to 4.0 km/h"
      }
    ]
  },
  {
    "name": "Countryside Hike",
    "description": "Combines varying pace and incline to simulate an outdoor hike — gentle on the joints but effective for burning calories and toning the legs.",
    "difficulty": "easy",
    "workoutType": "cardio",
    "trainingObjective": "Combines varying pace and incline to simulate an outdoor hike — gentle on the joints but effective for burning calories and toning the legs.",
    "intervals": [
      {
        "name": "Warm Up",
        "durationSeconds": 240,
        "speed": 3.0,
        "incline": 5.0,
        "instruction": "Adjust speed to 3.0 km/h and incline to 5%"
      },
      {
        "name": "Push",
        "durationSeconds": 180,
        "speed": 4.0,
        "incline": 7.0,
        "instruction": "Adjust speed to 4.0 km/h and incline to 7%"
      },
      {
        "name": "Push",
        "durationSeconds": 144,
        "speed": 5.0,
        "incline": 10.0,
        "instruction": "Adjust speed to 5.0 km/h and incline to 10%"
      },
      {
        "name": "Push",
        "durationSeconds": 120,
        "speed": 6.0,
        "incline": 5.0,
        "instruction": "Adjust speed to 6.0 km/h and incline to 5%"
      },
      {
        "name": "Recovery",
        "durationSeconds": 240,
        "speed": 3.0,
        "incline": 7.0,
        "instruction": "Adjust speed to 3.0 km/h and incline to 7%"
      },
      {
        "name": "Push",
        "durationSeconds": 180,
        "speed": 4.0,
        "incline": 10.0,
        "instruction": "Adjust speed to 4.0 km/h and incline to 10%"
      },
      {
        "name": "Push",
        "durationSeconds": 144,
        "speed": 5.0,
        "incline": 13.0,
        "instruction": "Adjust speed to 5.0 km/h and incline to 13%"
      },
      {
        "name": "Peak Effort",
        "durationSeconds": 120,
        "speed": 6.0,
        "incline": 10.0,
        "instruction": "Adjust speed to 6.0 km/h and incline to 10%"
      },
      {
        "name": "Recovery",
        "durationSeconds": 144,
        "speed": 5.0,
        "incline": 13.0,
        "instruction": "Adjust speed to 5.0 km/h and incline to 13%"
      },
      {
        "name": "Steady Finish",
        "durationSeconds": 144,
        "speed": 5.0,
        "incline": 15.0,
        "instruction": "Adjust incline to 15%"
      }
    ]
  },
  {
    "name": "Beginner's Walk",
    "description": "A slow, gradual start for anyone completely new to a treadmill — walks through a range of gentle paces and inclines to ease the legs in.",
    "difficulty": "easy",
    "workoutType": "mixed",
    "trainingObjective": "A slow, gradual start for anyone completely new to a treadmill — walks through a range of gentle paces and inclines to ease the legs in.",
    "intervals": [
      {
        "name": "Warm Up",
        "durationSeconds": 200,
        "speed": 3.6,
        "incline": 1.0,
        "instruction": "Adjust speed to 3.6 km/h and incline to 1%"
      },
      {
        "name": "Push",
        "durationSeconds": 144,
        "speed": 5.0,
        "incline": 2.0,
        "instruction": "Adjust speed to 5.0 km/h and incline to 2%"
      },
      {
        "name": "Keep Going",
        "durationSeconds": 120,
        "speed": 6.0,
        "incline": 2.0,
        "instruction": "Adjust speed to 6.0 km/h"
      },
      {
        "name": "Drive On",
        "durationSeconds": 103,
        "speed": 7.0,
        "incline": 4.0,
        "instruction": "Adjust speed to 7.0 km/h and incline to 4%"
      },
      {
        "name": "Recovery",
        "durationSeconds": 144,
        "speed": 5.0,
        "incline": 5.0,
        "instruction": "Adjust speed to 5.0 km/h and incline to 5%"
      },
      {
        "name": "One Last Burst",
        "durationSeconds": 120,
        "speed": 6.0,
        "incline": 6.0,
        "instruction": "Adjust speed to 6.0 km/h and incline to 6%"
      },
      {
        "name": "Hold",
        "durationSeconds": 144,
        "speed": 5.0,
        "incline": 7.0,
        "instruction": "Adjust speed to 5.0 km/h and incline to 7%"
      },
      {
        "name": "Peak Effort",
        "durationSeconds": 120,
        "speed": 6.0,
        "incline": 8.0,
        "instruction": "Adjust speed to 6.0 km/h and incline to 8%"
      },
      {
        "name": "Ease Off",
        "durationSeconds": 180,
        "speed": 4.0,
        "incline": 9.0,
        "instruction": "Adjust speed to 4.0 km/h and incline to 9%"
      },
      {
        "name": "Steady Finish",
        "durationSeconds": 189,
        "speed": 3.8,
        "incline": 10.0,
        "instruction": "Adjust speed to 3.8 km/h and incline to 10%"
      }
    ]
  },
  {
    "name": "Beginner's Sprints",
    "description": "Introduces higher speeds by alternating walking and sprinting against a gradually easing incline — a strong heart-rate and calorie-burning combination even at an entry level.",
    "difficulty": "intense",
    "workoutType": "mixed",
    "trainingObjective": "Introduces higher speeds by alternating walking and sprinting against a gradually easing incline — a strong heart-rate and calorie-burning combination even at an entry level.",
    "intervals": [
      {
        "name": "Warm Up",
        "durationSeconds": 195,
        "speed": 3.7,
        "incline": 10.0,
        "instruction": "Adjust speed to 3.7 km/h and incline to 10%"
      },
      {
        "name": "Peak Effort",
        "durationSeconds": 45,
        "speed": 16.0,
        "incline": 9.0,
        "instruction": "Adjust speed to 16.0 km/h and incline to 9%"
      },
      {
        "name": "Recovery",
        "durationSeconds": 180,
        "speed": 4.0,
        "incline": 8.0,
        "instruction": "Adjust speed to 4.0 km/h and incline to 8%"
      },
      {
        "name": "Push",
        "durationSeconds": 45,
        "speed": 16.0,
        "incline": 7.0,
        "instruction": "Adjust speed to 16.0 km/h and incline to 7%"
      },
      {
        "name": "Ease Off",
        "durationSeconds": 180,
        "speed": 4.0,
        "incline": 6.0,
        "instruction": "Adjust speed to 4.0 km/h and incline to 6%"
      },
      {
        "name": "Keep Going",
        "durationSeconds": 45,
        "speed": 16.0,
        "incline": 5.0,
        "instruction": "Adjust speed to 16.0 km/h and incline to 5%"
      },
      {
        "name": "Catch Your Breath",
        "durationSeconds": 180,
        "speed": 4.0,
        "incline": 4.0,
        "instruction": "Adjust speed to 4.0 km/h and incline to 4%"
      },
      {
        "name": "Drive On",
        "durationSeconds": 45,
        "speed": 16.0,
        "incline": 3.0,
        "instruction": "Adjust speed to 16.0 km/h and incline to 3%"
      },
      {
        "name": "Settle In",
        "durationSeconds": 180,
        "speed": 4.0,
        "incline": 2.0,
        "instruction": "Adjust speed to 4.0 km/h and incline to 2%"
      },
      {
        "name": "Steady Finish",
        "durationSeconds": 45,
        "speed": 16.0,
        "incline": 1.0,
        "instruction": "Adjust speed to 16.0 km/h and incline to 1%"
      }
    ]
  },
  {
    "name": "Beginner's Run",
    "description": "Builds gradually from a walk to a jog to a sprint, getting the body used to sustaining and developing speed while incline steadily climbs alongside it.",
    "difficulty": "intense",
    "workoutType": "mixed",
    "trainingObjective": "Builds gradually from a walk to a jog to a sprint, getting the body used to sustaining and developing speed while incline steadily climbs alongside it.",
    "intervals": [
      {
        "name": "Warm Up",
        "durationSeconds": 189,
        "speed": 3.8,
        "incline": 3.0,
        "instruction": "Adjust speed to 3.8 km/h and incline to 3%"
      },
      {
        "name": "Push",
        "durationSeconds": 144,
        "speed": 5.0,
        "incline": 4.0,
        "instruction": "Adjust speed to 5.0 km/h and incline to 4%"
      },
      {
        "name": "Keep Going",
        "durationSeconds": 90,
        "speed": 8.0,
        "incline": 5.0,
        "instruction": "Adjust speed to 8.0 km/h and incline to 5%"
      },
      {
        "name": "Drive On",
        "durationSeconds": 72,
        "speed": 10.0,
        "incline": 6.0,
        "instruction": "Adjust speed to 10.0 km/h and incline to 6%"
      },
      {
        "name": "One Last Burst",
        "durationSeconds": 60,
        "speed": 12.0,
        "incline": 7.0,
        "instruction": "Adjust speed to 12.0 km/h and incline to 7%"
      },
      {
        "name": "Dig Deep",
        "durationSeconds": 55,
        "speed": 13.0,
        "incline": 8.0,
        "instruction": "Adjust speed to 13.0 km/h and incline to 8%"
      },
      {
        "name": "Peak Effort",
        "durationSeconds": 45,
        "speed": 16.0,
        "incline": 9.0,
        "instruction": "Adjust speed to 16.0 km/h and incline to 9%"
      },
      {
        "name": "Recovery",
        "durationSeconds": 180,
        "speed": 4.0,
        "incline": 10.0,
        "instruction": "Adjust speed to 4.0 km/h and incline to 10%"
      },
      {
        "name": "Push",
        "durationSeconds": 144,
        "speed": 5.0,
        "incline": 11.0,
        "instruction": "Adjust speed to 5.0 km/h and incline to 11%"
      },
      {
        "name": "Steady Finish",
        "durationSeconds": 120,
        "speed": 6.0,
        "incline": 12.0,
        "instruction": "Adjust speed to 6.0 km/h and incline to 12%"
      }
    ]
  },
  {
    "name": "2KM Time Trial - 15 Minutes",
    "description": "A great starting benchmark for time-trial or race training — see how long you can hold your intensity over a fixed 2km distance while burning calories.",
    "difficulty": "easy",
    "workoutType": "speed",
    "trainingObjective": "A great starting benchmark for time-trial or race training — see how long you can hold your intensity over a fixed 2km distance while burning calories.",
    "intervals": [
      {
        "name": "Warm Up",
        "durationSeconds": 180,
        "speed": 4.0,
        "incline": 0.0,
        "instruction": "Speed to 4.0 km/h"
      },
      {
        "name": "Push",
        "durationSeconds": 103,
        "speed": 7.0,
        "incline": 0.0,
        "instruction": "Speed to 7.0 km/h"
      },
      {
        "name": "Keep Going",
        "durationSeconds": 90,
        "speed": 8.0,
        "incline": 0.0,
        "instruction": "Speed to 8.0 km/h"
      },
      {
        "name": "Hold",
        "durationSeconds": 90,
        "speed": 8.0,
        "incline": 0.0
      },
      {
        "name": "Drive On",
        "durationSeconds": 80,
        "speed": 9.0,
        "incline": 0.0,
        "instruction": "Speed to 9.0 km/h"
      },
      {
        "name": "One Last Burst",
        "durationSeconds": 72,
        "speed": 10.0,
        "incline": 0.0,
        "instruction": "Speed to 10.0 km/h"
      },
      {
        "name": "Steady",
        "durationSeconds": 72,
        "speed": 10.0,
        "incline": 0.0
      },
      {
        "name": "Peak Effort",
        "durationSeconds": 72,
        "speed": 10.0,
        "incline": 0.0
      },
      {
        "name": "Maintain",
        "durationSeconds": 72,
        "speed": 10.0,
        "incline": 0.0
      },
      {
        "name": "Final Push",
        "durationSeconds": 72,
        "speed": 10.0,
        "incline": 0.0
      }
    ]
  },
  {
    "name": "2KM Time Trial - 12 Minutes",
    "description": "The next step up in time-trial training — hits a new top speed, with longer gaps between pace changes.",
    "difficulty": "moderate",
    "workoutType": "speed",
    "trainingObjective": "The next step up in time-trial training — hits a new top speed, with longer gaps between pace changes.",
    "intervals": [
      {
        "name": "Warm Up",
        "durationSeconds": 90,
        "speed": 8.0,
        "incline": 0.0,
        "instruction": "Speed to 8.0 km/h"
      },
      {
        "name": "Push",
        "durationSeconds": 80,
        "speed": 9.0,
        "incline": 0.0,
        "instruction": "Speed to 9.0 km/h"
      },
      {
        "name": "Hold",
        "durationSeconds": 80,
        "speed": 9.0,
        "incline": 0.0
      },
      {
        "name": "Steady",
        "durationSeconds": 80,
        "speed": 9.0,
        "incline": 0.0
      },
      {
        "name": "Keep Going",
        "durationSeconds": 72,
        "speed": 10.0,
        "incline": 0.0,
        "instruction": "Speed to 10.0 km/h"
      },
      {
        "name": "Maintain",
        "durationSeconds": 72,
        "speed": 10.0,
        "incline": 0.0
      },
      {
        "name": "Drive On",
        "durationSeconds": 65,
        "speed": 11.0,
        "incline": 0.0,
        "instruction": "Speed to 11.0 km/h"
      },
      {
        "name": "Stay Here",
        "durationSeconds": 65,
        "speed": 11.0,
        "incline": 0.0
      },
      {
        "name": "One Last Burst",
        "durationSeconds": 60,
        "speed": 12.0,
        "incline": 0.0,
        "instruction": "Speed to 12.0 km/h"
      },
      {
        "name": "Final Push",
        "durationSeconds": 60,
        "speed": 12.0,
        "incline": 0.0
      }
    ]
  },
  {
    "name": "2KM Time Trial - 10 Minutes",
    "description": "Pushes further with another new top speed, and a higher starting pace that raises the intensity from the very first section.",
    "difficulty": "moderate",
    "workoutType": "speed",
    "trainingObjective": "Pushes further with another new top speed, and a higher starting pace that raises the intensity from the very first section.",
    "intervals": [
      {
        "name": "Warm Up",
        "durationSeconds": 80,
        "speed": 9.0,
        "incline": 0.0,
        "instruction": "Speed to 9.0 km/h"
      },
      {
        "name": "Hold",
        "durationSeconds": 80,
        "speed": 9.0,
        "incline": 0.0
      },
      {
        "name": "Push",
        "durationSeconds": 60,
        "speed": 12.0,
        "incline": 0.0,
        "instruction": "Speed to 12.0 km/h"
      },
      {
        "name": "Steady",
        "durationSeconds": 60,
        "speed": 12.0,
        "incline": 0.0
      },
      {
        "name": "Keep Going",
        "durationSeconds": 51,
        "speed": 14.0,
        "incline": 0.0,
        "instruction": "Speed to 14.0 km/h"
      },
      {
        "name": "Recovery",
        "durationSeconds": 60,
        "speed": 12.0,
        "incline": 0.0,
        "instruction": "Speed to 12.0 km/h"
      },
      {
        "name": "Drive On",
        "durationSeconds": 51,
        "speed": 14.0,
        "incline": 0.0,
        "instruction": "Speed to 14.0 km/h"
      },
      {
        "name": "Ease Off",
        "durationSeconds": 55,
        "speed": 13.0,
        "incline": 0.0,
        "instruction": "Speed to 13.0 km/h"
      },
      {
        "name": "Peak Effort",
        "durationSeconds": 51,
        "speed": 14.0,
        "incline": 0.0,
        "instruction": "Speed to 14.0 km/h"
      },
      {
        "name": "Final Push",
        "durationSeconds": 51,
        "speed": 14.0,
        "incline": 0.0
      }
    ]
  },
  {
    "name": "2KM Time Trial - 8 Minutes",
    "description": "Training like a professional now — no more jogging, just a relentless pace held for the full duration.",
    "difficulty": "intense",
    "workoutType": "speed",
    "trainingObjective": "Training like a professional now — no more jogging, just a relentless pace held for the full duration.",
    "intervals": [
      {
        "name": "Warm Up",
        "durationSeconds": 75,
        "speed": 10.0,
        "incline": 0.0,
        "instruction": "Speed to 10.0 km/h"
      },
      {
        "name": "Push",
        "durationSeconds": 45,
        "speed": 16.0,
        "incline": 0.0,
        "instruction": "Speed to 16.0 km/h"
      },
      {
        "name": "Hold",
        "durationSeconds": 45,
        "speed": 16.0,
        "incline": 0.0
      },
      {
        "name": "Steady",
        "durationSeconds": 45,
        "speed": 16.0,
        "incline": 0.0
      },
      {
        "name": "Maintain",
        "durationSeconds": 45,
        "speed": 16.0,
        "incline": 0.0
      },
      {
        "name": "Peak Effort",
        "durationSeconds": 45,
        "speed": 16.0,
        "incline": 0.0
      },
      {
        "name": "Stay Here",
        "durationSeconds": 45,
        "speed": 16.0,
        "incline": 0.0
      },
      {
        "name": "Hold",
        "durationSeconds": 45,
        "speed": 16.0,
        "incline": 0.0
      },
      {
        "name": "Steady",
        "durationSeconds": 45,
        "speed": 16.0,
        "incline": 0.0
      },
      {
        "name": "Final Push",
        "durationSeconds": 45,
        "speed": 16.0,
        "incline": 0.0
      }
    ]
  },
  {
    "name": "2KM Time Trial - 7 Minutes",
    "description": "Reaches the treadmill's top speed, setting a blistering benchmark and pushing the body's endurance to its absolute limit.",
    "difficulty": "intense",
    "workoutType": "speed",
    "trainingObjective": "Reaches the treadmill's top speed, setting a blistering benchmark and pushing the body's endurance to its absolute limit.",
    "intervals": [
      {
        "name": "Warm Up",
        "durationSeconds": 50,
        "speed": 15.0,
        "incline": 0.0,
        "instruction": "Speed to 15.0 km/h"
      },
      {
        "name": "Push",
        "durationSeconds": 45,
        "speed": 16.0,
        "incline": 0.0,
        "instruction": "Speed to 16.0 km/h"
      },
      {
        "name": "Keep Going",
        "durationSeconds": 42,
        "speed": 17.0,
        "incline": 0.0,
        "instruction": "Speed to 17.0 km/h"
      },
      {
        "name": "Hold",
        "durationSeconds": 42,
        "speed": 17.0,
        "incline": 0.0
      },
      {
        "name": "Steady",
        "durationSeconds": 42,
        "speed": 17.0,
        "incline": 0.0
      },
      {
        "name": "Drive On",
        "durationSeconds": 40,
        "speed": 18.0,
        "incline": 0.0,
        "instruction": "Speed to 18.0 km/h"
      },
      {
        "name": "Maintain",
        "durationSeconds": 40,
        "speed": 18.0,
        "incline": 0.0
      },
      {
        "name": "Peak Effort",
        "durationSeconds": 40,
        "speed": 18.0,
        "incline": 0.0
      },
      {
        "name": "Stay Here",
        "durationSeconds": 40,
        "speed": 18.0,
        "incline": 0.0
      },
      {
        "name": "Final Push",
        "durationSeconds": 40,
        "speed": 18.0,
        "incline": 0.0
      }
    ]
  },
  {
    "name": "Football Player",
    "description": "Based on the training routine of a well-known former professional footballer — extremely intense, built for endurance and power.",
    "warning": "Note: This program requires you to be competent at running at high speeds, safely getting on and off the running belt and changing direction if necessary",
    "difficulty": "intense",
    "workoutType": "mixed",
    "trainingObjective": "Based on the training routine of a well-known former professional footballer — extremely intense, built for endurance and power.",
    "intervals": [
      {
        "name": "Sprint 1",
        "durationSeconds": 60,
        "speed": 18.0,
        "incline": 12.0,
        "instruction": "20 secs on the belt, 40 secs off — repeat this pattern throughout"
      },
      {
        "name": "Sprint 2",
        "durationSeconds": 60,
        "speed": 18.0,
        "incline": 12.0,
        "instruction": "20 secs on the belt, 40 secs off"
      },
      {
        "name": "Sprint 3",
        "durationSeconds": 60,
        "speed": 18.0,
        "incline": 12.0,
        "instruction": "20 secs on the belt, 40 secs off"
      },
      {
        "name": "Sprint 4",
        "durationSeconds": 60,
        "speed": 18.0,
        "incline": 12.0,
        "instruction": "20 secs on the belt, 40 secs off"
      },
      {
        "name": "Sprint 5",
        "durationSeconds": 60,
        "speed": 18.0,
        "incline": 12.0,
        "instruction": "20 secs on the belt, 40 secs off"
      },
      {
        "name": "Sprint 6",
        "durationSeconds": 60,
        "speed": 18.0,
        "incline": 12.0,
        "instruction": "20 secs on the belt, 40 secs off"
      },
      {
        "name": "Sprint 7",
        "durationSeconds": 60,
        "speed": 18.0,
        "incline": 12.0,
        "instruction": "20 secs on the belt, 40 secs off"
      },
      {
        "name": "Sprint 8",
        "durationSeconds": 60,
        "speed": 18.0,
        "incline": 12.0,
        "instruction": "20 secs on the belt, 40 secs off"
      },
      {
        "name": "Sprint 9",
        "durationSeconds": 60,
        "speed": 18.0,
        "incline": 12.0,
        "instruction": "20 secs on the belt, 40 secs off"
      },
      {
        "name": "Sprint 10",
        "durationSeconds": 60,
        "speed": 18.0,
        "incline": 12.0,
        "instruction": "20 secs on the belt, 40 secs off"
      }
    ]
  },
  {
    "name": "Boxer",
    "description": "Incorporates varied movement to improve agility, plus sprints to build stamina — mirrors the footwork and bursts of a boxer's training.",
    "warning": "Note: This program requires you to be competent at running at high speeds, safely getting on and off the running belt and changing direction if necessary",
    "difficulty": "intense",
    "workoutType": "mixed",
    "trainingObjective": "Incorporates varied movement to improve agility, plus sprints to build stamina — mirrors the footwork and bursts of a boxer's training.",
    "intervals": [
      {
        "name": "Jog",
        "durationSeconds": 90,
        "speed": 8.0,
        "incline": 0.0
      },
      {
        "name": "Side Shuffle",
        "durationSeconds": 90,
        "speed": 8.0,
        "incline": 0.0,
        "instruction": "Side shuffle along the belt, switching sides every 10s"
      },
      {
        "name": "Push",
        "durationSeconds": 60,
        "speed": 12.0,
        "incline": 0.0
      },
      {
        "name": "Recovery",
        "durationSeconds": 120,
        "speed": 6.0,
        "incline": 0.0
      },
      {
        "name": "Side Shuffle",
        "durationSeconds": 90,
        "speed": 8.0,
        "incline": 0.0,
        "instruction": "Side shuffle along the belt, switching sides every 10s"
      },
      {
        "name": "Sprint",
        "durationSeconds": 51,
        "speed": 14.0,
        "incline": 0.0
      },
      {
        "name": "Recovery",
        "durationSeconds": 120,
        "speed": 6.0,
        "incline": 0.0
      },
      {
        "name": "Side Shuffle",
        "durationSeconds": 90,
        "speed": 8.0,
        "incline": 0.0,
        "instruction": "Side shuffle along the belt, switching sides every 10s"
      },
      {
        "name": "Max Sprint",
        "durationSeconds": 45,
        "speed": 16.0,
        "incline": 0.0
      },
      {
        "name": "Cool Down",
        "durationSeconds": 120,
        "speed": 6.0,
        "incline": 0.0
      }
    ]
  },
  {
    "name": "Rugby Player",
    "description": "Develops muscular endurance plus aerobic and anaerobic fitness, alternating running efforts with bodyweight squats off the belt.",
    "warning": "Note: This program requires you to be competent at running at high speeds, safely getting on and off the running belt and changing direction if necessary",
    "difficulty": "intense",
    "workoutType": "mixed",
    "trainingObjective": "Develops muscular endurance plus aerobic and anaerobic fitness, alternating running efforts with bodyweight squats off the belt.",
    "intervals": [
      {
        "name": "Run",
        "durationSeconds": 72,
        "speed": 10.0,
        "incline": 0.0
      },
      {
        "name": "Squats",
        "durationSeconds": 53,
        "speed": 0.0,
        "incline": 0.0,
        "instruction": "Step on the sides of the treadmill and complete as many squats as possible until the next interval"
      },
      {
        "name": "Run",
        "durationSeconds": 60,
        "speed": 12.0,
        "incline": 0.0
      },
      {
        "name": "Squats",
        "durationSeconds": 53,
        "speed": 0.0,
        "incline": 0.0,
        "instruction": "Step on the sides of the treadmill and complete as many squats as possible until the next interval"
      },
      {
        "name": "Run",
        "durationSeconds": 51,
        "speed": 14.0,
        "incline": 0.0
      },
      {
        "name": "Squats",
        "durationSeconds": 53,
        "speed": 0.0,
        "incline": 0.0,
        "instruction": "Step on the sides of the treadmill and complete as many squats as possible until the next interval"
      },
      {
        "name": "Run",
        "durationSeconds": 45,
        "speed": 16.0,
        "incline": 0.0
      },
      {
        "name": "Squats",
        "durationSeconds": 53,
        "speed": 0.0,
        "incline": 0.0,
        "instruction": "Step on the sides of the treadmill and complete as many squats as possible until the next interval"
      },
      {
        "name": "Sprint",
        "durationSeconds": 40,
        "speed": 18.0,
        "incline": 0.0
      },
      {
        "name": "Squats",
        "durationSeconds": 53,
        "speed": 0.0,
        "incline": 0.0,
        "instruction": "Step on the sides of the treadmill and complete as many squats as possible until the next interval"
      }
    ]
  },
  {
    "name": "Tennis Player",
    "description": "Professional tennis players are known for exceptional endurance, since matches can last hours — this program builds that endurance steadily through mixed walking, lunges, and running.",
    "difficulty": "moderate",
    "workoutType": "mixed",
    "trainingObjective": "Professional tennis players are known for exceptional endurance, since matches can last hours — this program builds that endurance steadily through mixed walking, lunges, and running.",
    "intervals": [
      {
        "name": "Walking Lunges",
        "durationSeconds": 180,
        "speed": 4.0,
        "incline": 0.0,
        "instruction": "Perform walking lunges"
      },
      {
        "name": "Rest / Walk",
        "durationSeconds": 120,
        "speed": 6.0,
        "incline": 0.0
      },
      {
        "name": "Walking Lunges",
        "durationSeconds": 180,
        "speed": 4.0,
        "incline": 0.0,
        "instruction": "Perform walking lunges"
      },
      {
        "name": "Rest / Walk",
        "durationSeconds": 120,
        "speed": 6.0,
        "incline": 0.0
      },
      {
        "name": "Walking Lunges",
        "durationSeconds": 180,
        "speed": 4.0,
        "incline": 0.0,
        "instruction": "Perform walking lunges"
      },
      {
        "name": "Rest / Walk",
        "durationSeconds": 120,
        "speed": 6.0,
        "incline": 0.0
      },
      {
        "name": "Run",
        "durationSeconds": 72,
        "speed": 10.0,
        "incline": 0.0
      },
      {
        "name": "Walk",
        "durationSeconds": 120,
        "speed": 6.0,
        "incline": 0.0
      },
      {
        "name": "Run",
        "durationSeconds": 72,
        "speed": 10.0,
        "incline": 0.0
      },
      {
        "name": "Walk",
        "durationSeconds": 120,
        "speed": 6.0,
        "incline": 0.0
      }
    ]
  },
  {
    "name": "Cross Country Runner",
    "description": "Built to combat every runner's fear — hills. After a warm-up, this workout pushes heart rate and burns the legs and lungs, simulating trail running for the days a treadmill is the only option.",
    "difficulty": "intense",
    "workoutType": "mixed",
    "trainingObjective": "Built to combat every runner's fear — hills. After a warm-up, this workout pushes heart rate and burns the legs and lungs, simulating trail running for the days a treadmill is the only option.",
    "intervals": [
      {
        "name": "Warm Up",
        "durationSeconds": 120,
        "speed": 8.0,
        "incline": 0.0
      },
      {
        "name": "Attack",
        "durationSeconds": 45,
        "speed": 16.0,
        "incline": 2.0,
        "instruction": "Adjust speed to 16.0 km/h and incline to 2%"
      },
      {
        "name": "Hold",
        "durationSeconds": 51,
        "speed": 14.0,
        "incline": 4.0,
        "instruction": "Adjust speed to 14.0 km/h and incline to 4%"
      },
      {
        "name": "Steady",
        "durationSeconds": 60,
        "speed": 12.0,
        "incline": 6.0,
        "instruction": "Adjust speed to 12.0 km/h and incline to 6%"
      },
      {
        "name": "Push",
        "durationSeconds": 60,
        "speed": 12.0,
        "incline": 8.0,
        "instruction": "Adjust incline to 8%"
      },
      {
        "name": "Maintain",
        "durationSeconds": 72,
        "speed": 10.0,
        "incline": 10.0,
        "instruction": "Adjust speed to 10.0 km/h and incline to 10%"
      },
      {
        "name": "Stay Here",
        "durationSeconds": 90,
        "speed": 8.0,
        "incline": 12.0,
        "instruction": "Adjust speed to 8.0 km/h and incline to 12%"
      },
      {
        "name": "Hold",
        "durationSeconds": 120,
        "speed": 6.0,
        "incline": 14.0,
        "instruction": "Adjust speed to 6.0 km/h and incline to 14%"
      },
      {
        "name": "Keep Going",
        "durationSeconds": 120,
        "speed": 6.0,
        "incline": 16.0,
        "instruction": "Adjust incline to 16%"
      },
      {
        "name": "Steady",
        "durationSeconds": 180,
        "speed": 4.0,
        "incline": 18.0,
        "instruction": "Adjust speed to 4.0 km/h and incline to 18%"
      },
      {
        "name": "Final Push",
        "durationSeconds": 180,
        "speed": 4.0,
        "incline": 20.0,
        "instruction": "Adjust incline to 20%"
      }
    ]
  }
]
