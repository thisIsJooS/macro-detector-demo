import os
import time
import pyautogui
from selenium.webdriver.common.by import By
from selenium import webdriver
from selenium.webdriver.chrome.service import Service


def click_by_xpath(xpath):
    error = False
    while not error:
        try:
            driver.find_element(by=By.XPATH, value=xpath).click()
            error = True
        except:
            pass

# Assuming DRIVER_PATH is correctly defined and points to the chromedriver executable.
DRIVER_PATH = os.path.join(os.path.dirname(__file__), 'chromedriver')
service = Service(DRIVER_PATH)
driver = webdriver.Chrome(service=service)

# 크롬드라이버가 켜졌을 때 일관성을 유지하기 위해 화면에 뜰 위치와 크기를 지정해준다.
driver.set_window_position(0, 0, windowHandle='current')
driver.set_window_size(950, 700)

# 예약 페이지 접속
driver.get('http://127.0.0.1:3001/index.html')

# 좌석 2개 선택
pyautogui.moveTo(355, 545, 0.30)
pyautogui.click()
pyautogui.moveTo(378, 545, 0.30)
pyautogui.click()

# 예약 버튼 선택
pyautogui.moveTo(825, 640, 0.30)
pyautogui.click()

time.sleep(300)