# User Session Report

Generates a report showing which users are currently logged in to which machines, based on login and logout events from the network.

## Problem

Track which users are logged in to which machines at a given time.

## Input

Login/logout events (timestamp, event type, machine, user). Sample data is in `sample_events.txt`.

## Output

A report listing each machine that has active users and who is logged in.

## How to Run

```bash
python3 generate_user_session_report.py
```

## Example Output

```
webserver.local: lane
mailserver.local: chris
```

See `expected_output.txt` for the expected result.
