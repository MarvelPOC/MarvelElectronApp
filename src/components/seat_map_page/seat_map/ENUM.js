const TYPE = {
  CABIN: 'CABIN',
  ROW: 'ROW',
  WING: 'WING',
  EXIT: 'EXIT'
};

const AREA = {
  FIRST: 'First',
  ECONOMY: 'Economy',
};

const CABIN_MAPPING = {
  A: 'A',
  B: 'B',
  C: 'C',
  D: 'D',
  E: 'E',
  F: 'F',
  G: 'G',
  H: 'H',
  J: 'J',
  K: 'K',
  '|': '',
};

const ROW_MAPPING = {
B: '01_economy_seat_ng.png',
C: '24_closet.png',
D: '07_fourth_priority_seat_armrest.png',
Z: '07_fourth_priority_seat.png',
F: '07_third_priority_seat_armrest.png',
G: '23_galley.png',
H: '08_second_priority_seat_armrest.png',
I: '08_second_priority_seat.png',
J: '09_first_priority_seat.png',
K: '08_second_priority_seat_armrestL.png',
L: '32_lav.png',
M: '30_monitor.png',
N: '07_third_priority_seat.png',
O: '36_lav_baby.png',
P : '12_first_block_seat_armrest.png',
Q: '12_first_block_seat_armrestL.png',
R: '12_first_block_seat_armrestR.png',
S:'25_stowage.png',
T: '12_first_block_seat.png',
U: '13_group_block_seat.png',
V: '06_exit_seat_armrest.png',
W: '10_no_window_right_seat_armrestL.png',
Y: '10_no_window_left_seat_armrestR.png',
ｽ: '02_normal_seat_armrestR.png',
'1': '02_normal_seat_armrestL.png',
'2': '04_economy_seat_exit.png',
'3': '19_already_asr_armrest.png',
ｾ: '04_net_seat_armrestL.png',
ﾃ: '09_first_priority_seat_armrestR.png',
ｳ: '09_first_priority_seat_armrest.png',
ﾄ: '09_first_priority_seat_armrestL.png',
ｹ: '11_reclining_ng_seat.png',
ｸ: '11_reclining_ng_seat.png',
ｲ: '45_lav_baby_hnd.png',
'>': '43_emergency_exit_door_lower.png',
'?': '27_handy_c.png',
'<': '43_emergency_exit_door_upper.png',
'-': '02_normal_seat_armrest.png',
_:   '04_net_seat_armrest.png',
'.': '02_normal_seat.png',
')': '10_no_window_left_seat.png',
'(': '10_no_window_left_seat.png',
'|': '',
};


const WING_MAPPING = {
  Z: '37_wing_upper.png',
  '/': '37_wing_lower.png'
};

const EXIT_MAPPING = {
  U: '21_emergency_exit_upper.png',
  E: '21_emergency_exit_lower.png',
  A: '22_boarding_emergency_exit_lower.png'
};

export {
  TYPE, AREA, CABIN_MAPPING, ROW_MAPPING, WING_MAPPING, EXIT_MAPPING
};

