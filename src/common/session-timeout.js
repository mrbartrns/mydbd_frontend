import React, { useState, useCallback } from "react";

function SessionTimeout() {
  // event listener를 정의한다.
  const [events, setEvents] = useState(["click", "load", "scroll"]);
  // 사용자가 로그아웃 하기 전에 남은 시간을 정의한다.
  const [second, setSecond] = useState(0);
}
