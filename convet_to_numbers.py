import pandas as pd
from sklearn.preprocessing import OneHotEncoder
location = "D:/coding/Project/heart.csv"


data = pd.read_csv(location)
df = pd.DataFrame(data)
df = df[["Sex","Age"]]
ohe = OneHotEncoder(categories=)
df = ohe.fit_transform(df)
print(df)