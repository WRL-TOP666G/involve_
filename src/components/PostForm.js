import React, {useState} from 'react';
import axios from "axios";
import sendIcon from "../send-svgrepo-com.svg"
function PostForm(){
    // const url="http://0.0.0.0:80/submit"
    url=""

    // const url="http://0.0.0.0:80/submit"
    // const [data, setData] = useState({
    //     name: "",
    //     phone: "",
    //     email: "",
    // })
    //
    // // function submit(e){
    // const submit = async (e) => {
    //     e.preventDefault();
    //     try{
    //         axios.post(url, data);
    //     } catch(error){
    //         console.error(error);
    //     }
    // }
    // function handle(e){
    //     const newData={...data}
    //     newData[e.target.id] = e.target.value
    //     setData(newData)
    //     console.log(newData)
    // }
    //
    // return(
    //     <div>
    //         {/*<form onSubmit={(e)=>submit(e)}>*/}
    //         <form onSubmit={submit}>
    //             <input onChange={(e)=>handle(e)} id="name" value={data.name} placeholder="name" type="text"></input>
    //             <input onChange={(e)=>handle(e)} id="phone" value={data.phone} placeholder="phone" type="text"></input>
    //             <input onChange={(e)=>handle(e)} id="email" value={data.email} placeholder="email" type="text"></input>
    //             <button>Submit</button>
    //         </form>
    //     </div>
    // )

    const [prompts, setPrompts] = useState([]);
    const [formData, setFormData] = useState({
        yourname: "",
        phone: "",
        email: "",
        customer: "",
        product: "",
        details: "",
        result: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const response = await axios.post(url, formData);
            // console.log(response.data);
            // console.log(response.data.result);
            console.log(response.data);
            setPrompts([...prompts, response.data.result]);
            console.log(prompts)
        } catch(error){
            console.error(error);
        }

        // const prompt = event.target[0].value;
        //
        // console.log(event.target);
        // // get response from http
        // let res='Get from GPT'
        //
        // // set prompt and response
        // const obj = { response: res}
        // setPrompts([...prompts, obj]);
    };

    function insertLineBreaks(text) {
        return text.split('\n').map((line, index, array) => (
            index === array.length - 1 ? line : (
                <React.Fragment key={index}>
                    {line}
                    <br />
                </React.Fragment>
            )
        ));
    }

    return (

        <div>
            <h1 className="intro">Personalized Email Outreach</h1>
            <p className="intro">This is an auto-generating email for introduction your products</p>
            <div className="navbar">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="yourname">Your Name:</label><br/>
                    <input type="text" id="yourname" name="yourname" value={formData.yourname} onChange={handleChange}/><br/>

                    <label htmlFor="phone">Phone:</label><br/>
                    <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange}/><br/>

                    <label htmlFor="email">Email:</label><br/>
                    <input type="text" id="email" name="email" value={formData.email} onChange={handleChange}/><br/>

                    <label htmlFor="customer">Customer:</label><br/>
                    <input type="text" id="customer" name="customer" value={formData.customer} onChange={handleChange}/><br/>

                    <label htmlFor="product">Product:</label><br/>
                    <input type="text" id="product" name="product" value={formData.product} onChange={handleChange}/><br/>

                    <label htmlFor="details">Details:</label><br/>
                    <textarea rows="7" cols="30" id="details" name="details" value={formData.details} onChange={handleChange}/><br/>

                    <button className="submit" type="submit">Submit <img className="sendIcon" src={sendIcon} alt="img"/> </button>
                </form>

            </div>

            <div className="replyDiv">
                <ul>
                    {prompts.map( item =>(
                        <li className='prompts'>
                            <div>
                                {/*<p>input: </p>*/}
                                {/*<p>{item.input}</p>*/}
                                {/*<p>response: </p>*/}
                                <p>{insertLineBreaks(item)}</p>
                            </div>
                            <br />
                        </li>
                    ))}
                </ul>
            </div>


        </div>
    );


}


export default PostForm;