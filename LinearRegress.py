import numpy as np
from sklearn.linear_model import LinearRegression

model = LinearRegression()
model.fit()
print(model.predict(np.array([[2300,1300]])))
