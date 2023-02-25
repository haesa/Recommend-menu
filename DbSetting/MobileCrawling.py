import pandas as pd
import numpy as np
import requests
from urllib.request import urlopen
from urllib.parse import quote_plus
from bs4 import BeautifulSoup as bs
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.keys import Keys
import time
import urllib.request
import os
from selenium.webdriver.common.by import By
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db


# # 데이터 가져오기
# df = pd.read_csv('소상공인시장진흥공단_상가(상권)정보_서울_202212.csv', sep=',')
# # 음식점 데이터만 추출
# df = df.loc[df['상권업종대분류명'] == '음식']
# df = df[['상호명', '상권업종중분류명', '상권업종소분류명', '표준산업분류명', '행정동명', '위도', '경도']]

# # # 숙명여대
# # df = df.loc[(df['행정동명'] == '청파동')]

# # # 중앙대
# # df = df.loc[(df['행정동명'] == '흑석동') | (df['행정동명'] == '상도1동')]

# # 홍익대
# df = df.loc[(df['행정동명'] == '서교동') | (df['행정동명'] == '상수동')]

# # 칼럼명 단순화

# df.columns = ['name',  # 상호명
#               'cate_1',  # 중분류명
#               'cate_2',  # 소분류명
#               'cate_3',  # 표준산업분류명
#               'dong',  # 행정동명
#               'lon',  # 위도
#               'lat'  # 경도
#               ]
# # 카페, 주점 등 제거
# df = df.loc[(df['cate_3'] != '제과점업') & (df['cate_3'] != '비알콜 음료점업')
#             & (df['cate_3'] != '기타 주점업') & (df['cate_3'] != '일반유흥 주점업')]

# # # df.to_csv("sookmyung.csv")
# # df.to_csv("chungang.csv")

# # # df = pd.read_csv("sookmyung.csv", sep=',')
# # df = pd.read_csv("chungang.csv", sep=',')

df = pd.read_csv("hongik.csv", sep=",")

# 크롤링
driver = webdriver.Chrome("chromedriver")
options = webdriver.ChromeOptions()
options.add_argument(
    "user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.75 Safari/537.36")

cred = credentials.Certificate(
    'recommend-menu-firebase-adminsdk-iwo0t-45a48fded7.json')
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://recommend-menu-default-rtdb.firebaseio.com/'})

univ = []
univ.append("숙명여대")
univ.append("중앙대")
univ.append("홍익대")


df['naver_keyword'] = "홍대 " + df['name']
df['naver_map_url'] = ''


# 본격적으로 가게 상세페이지의 URL을 가져옵시다

for i, keyword in enumerate(df['naver_keyword'].tolist()):
    print("이번에 찾을 키워드 :", i, f"/ {df.shape[0] -1} 행", keyword)
    try:
        nmap_url = 'https://m.map.naver.com/search2/search.naver?query='+keyword
        driver.get(nmap_url)
        time.sleep(0.5)
        for j in range(1, 2):
            # 링크
            xpath = driver.find_element(By.XPATH,
                                        '/html/body/div[4]/div[2]/ul/li['+str(j)+']').get_attribute("data-sid")

            # 가게 이름
            xpath_title = driver.find_element(By.XPATH,
                                              '/html/body/div[4]/div[2]/ul/li['+str(j)+']').get_attribute("data-title")
            refadd = univ[2] + "/" + xpath_title
            ref = db.reference(refadd)
            ref.update({'title': xpath_title})
            ref.update(
                {'link': 'https://m.place.naver.com/restaurant/'+xpath+'/home'})

            # 전화번호
            xpath_tel = driver.find_element(By.XPATH,
                                            '/html/body/div[4]/div[2]/ul/li['+str(j)+']').get_attribute("data-tel")
            ref.update({'tel': xpath_tel})

            # 주소
            xpath_address = driver.find_element(By.XPATH,
                                                '/html/body/div[4]/div[2]/ul/li['+str(j)+']/div[1]/div[1]/div/a').text
            ref.update({'address': xpath_address[5:]})

            # 카테고리
            cate = df['cate_3'].values[i].rstrip(' 음식점업')
            ref.update({'category': cate})

    # 검색 결과가 없는 경우
    except Exception as e1:
        if "li:nth-child(1)" in str(e1):
            try:
                df.iloc[i, -1] = driver.find_element(By.CSS_SELECTOR,
                                                     "#ct > div.search_listview._content._ctList > ul > li:nth-child(1) > div.item_info > a.a_item.a_item_distance._linkSiteview").get_attribute('data-cid')
                time.sleep(1)
            except Exception as e2:
                print(e2)
                df.iloc[i, -1] = np.nan
                time.sleep(1)
        else:
            pass


driver.quit()


# URL이 수집되지 않은 데이터 제거
df = df.loc[~df['naver_map_url'].isnull()]
# df.to_csv("sookmyung.csv")
df.to_csv("hongik.csv")
