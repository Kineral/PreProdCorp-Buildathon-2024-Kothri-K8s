import polars as pl

location = "D:/coding/Project/heart.csv"

data = pl.read_csv(location)
df = pl.DataFrame(data)

df = df.drop('ChestPainType','Oldpeak')


y = df['FastingBS','HeartDisease']
X = df.drop('FastingBS','HeartDisease')


print(X)

