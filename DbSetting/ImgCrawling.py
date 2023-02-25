from selenium import webdriver
from selenium.webdriver.common.by import By
import string
import time
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

univ = "홍익대"

url_list = []
data_id = []
datas = []
cred = credentials.Certificate(
    'recommend-menu-firebase-adminsdk-iwo0t-45a48fded7.json')
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://recommend-menu-default-rtdb.firebaseio.com/'})

driver = webdriver.Chrome("chromedriver")
options = webdriver.ChromeOptions()
options.add_argument(
    "user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.75 Safari/537.36")


def naverMapCrawling(search):
    # selenium 사용에 필요한 chromedriver.exe 파일 경로 지정
    driver.get(f"https://m.map.naver.com/search2/search.naver?query={search}")
    driver.implicitly_wait(3)  # 로딩이 끝날 때 까지 10초까지는 기다림

    items = driver.find_elements(By.CSS_SELECTOR, '._item ')

    for item in items:
        id = int(item.get_attribute('data-id'))

        # url_list.append(item.find_element(By.CSS_SELECTOR, '.item_common > a').get_attribute('data-url'))
        driver.get(f'https://m.place.naver.com/place/{id}/photo')
        time.sleep(1)

        try:
            image = driver.find_element(
                By.CSS_SELECTOR, 'div.wzrbN > a > img').get_attribute('src')
            print(image)
            return image
        except:
            image = ""
            print("사진 없음")
            return ""


ref = db.reference(univ)
obj = ref.get()

for o in obj:
    refadd = univ + "/" + o
    ref = db.reference(refadd)
    ref.update({'img': naverMapCrawling(o)})
