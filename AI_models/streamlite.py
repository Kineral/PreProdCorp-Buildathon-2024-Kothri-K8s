import streamlit as st
import pandas as pd


def ingetion():
    ing = st.form("Data Ingestion") 
    p,b=ing.columns([4,1])
    p = ing.file_uploader("Upload File")
    b = ing.form_submit_button("Ingest",use_container_width=True)
        
        
    if(p):
        file = pd.read_csv(p)
        file.to_csv("damn.csv")
        ing.success("Done.")

    dim = st.form("Dimensions of table")
    dim.subheader("Dimensions of table:")
    show_dim=dim.form_submit_button("Run")
    if (show_dim):
        dim.write(f"No. rows = {}")
def transform():
    st.write("Train")
def train():
    pass
def save():
    pass

st.title("Kothri K8s")
st.markdown("""<hr>
            <style>
            

            .st-emotion-cache-yfhhig.ef3psqc5{
            visibility: hidden;}
            
            .st-emotion-cache-1dp5vir.ezrtsby1{
            visibility: hidden;}
            
            .st-emotion-cache-1wbqy5l.e17vllj40{
            visibility:hidden;}
            h1{
            text-align:center;}
            </style>
            """,unsafe_allow_html=True)




Ingest,Transform,Train,Save = st.columns([1,1,1,1]) 
Ingetion= Ingest.button("Data Ingest",use_container_width=True,on_click=(ingetion()))
Transform.button("Transform",use_container_width=True,on_click=(transform()))
Train.button("train",use_container_width=True,on_click=(train()))
Save.button("Data ",use_container_width=True,on_click=(save()))
st.markdown(""" <hr>""",unsafe_allow_html=True)





