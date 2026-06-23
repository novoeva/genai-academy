#!/bin/bash

# GenAI Academy Dev Server Manager
# Usage: ./server.sh [start|stop|restart|status|logs]

PIDFILE=/tmp/genai-academy.pid
LOGFILE=/tmp/genai-academy.log

case "$1" in
  start)
    if [ -f "$PIDFILE" ] && kill -0 $(cat "$PIDFILE") 2>/dev/null; then
      echo "Server is already running (PID: $(cat $PIDFILE))"
      exit 0
    fi
    echo "Starting GenAI Academy dev server..."
    nohup npm run dev > "$LOGFILE" 2>&1 &
    echo $! > "$PIDFILE"
    sleep 2
    if curl -s -o /dev/null http://localhost:5173/; then
      echo "Server started successfully!"
      echo "Open: http://localhost:5173/"
    else
      echo "Server may have failed to start. Check logs: ./server.sh logs"
    fi
    ;;

  stop)
    if [ -f "$PIDFILE" ]; then
      PID=$(cat "$PIDFILE")
      if kill -0 "$PID" 2>/dev/null; then
        echo "Stopping server (PID: $PID)..."
        kill "$PID" 2>/dev/null
        sleep 1
        rm -f "$PIDFILE"
        echo "Server stopped."
      else
        echo "Server not running."
        rm -f "$PIDFILE"
      fi
    else
      echo "No PID file found. Server may not be running."
    fi
    ;;

  restart)
    $0 stop
    sleep 1
    $0 start
    ;;

  status)
    if [ -f "$PIDFILE" ] && kill -0 $(cat "$PIDFILE") 2>/dev/null; then
      echo "Server is running (PID: $(cat $PIDFILE))"
      echo "Open: http://localhost:5173/"
    else
      echo "Server is not running."
    fi
    ;;

  logs)
    tail -f "$LOGFILE"
    ;;

  *)
    echo "Usage: $0 [start|stop|restart|status|logs]"
    echo ""
    echo "Commands:"
    echo "  start    - Start the dev server (runs in background)"
    echo "  stop     - Stop the dev server"
    echo "  restart  - Restart the dev server"
    echo "  status   - Check if server is running"
    echo "  logs     - View server logs"
    exit 1
    ;;
esac
