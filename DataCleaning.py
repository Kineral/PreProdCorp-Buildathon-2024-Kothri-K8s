import pandas as pd

location = "D:/coding/Project/data.csv"


#read csv or excel file
def readFile(file_location) -> pd.DataFrame:
    if(file_location.endswith('csv')):    
        data = pd.read_csv(file_location)
        df = pd.DataFrame(data)
        df = df.dropna()
        df = df.drop_duplicates()
        return df
    elif(file_location.endswith('xlsx') or file_location.endswith('xls')):
        data = pd.read_excel(file_location)
        df = pd.DataFrame(data)
        df = df.dropna()
        df = df.drop_duplicates()
        return df
    else:
        print("Invalid File Type....")
        exit()

df = readFile(location)
df_columns = df.columns.to_list()
rows,columns =df.shape


if __name__=="__main__":
    print(df_columns)
    print(rows,columns)


