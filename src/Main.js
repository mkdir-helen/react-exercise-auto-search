import React, { Component } from 'react';
import dictionary from './words';

class Main extends Component{
    constructor(props){
        super(props);
        this.state={
            input: '',
            output: '',
            words: dictionary
        }
    }
    render(){
        return (
            <div>
                <input value={this.state.input} onChange={this._onChange}/>
                <div className="output">
                    {this._onSearch(this.state.input).map(word => {
                        return(
                            <p>{word}</p>
                        )
                    })}
                </div>
            </div>
        )
    }
    _onChange = (e) => {
        this.setState ({
            input: e.target.value,
            output: e.target.value
        })    
    }

    _onSearch = (originaltext) => {
        let usefulwords = [];
        const phrases = this.state.words;
        let input = originaltext.toLowerCase();
        for (let i=0; i<input.length; i++){
          for(let j= 0; j<phrases.length; j++){
            if(i === 0){
                if(input[0] === phrases[j][0]){
                    usefulwords.push(phrases[j]);
                }
            }else if (i > 0){
                if(!(input[i] === phrases[j][i] && input[i-1] === phrases[j][i-1])){
                   if(usefulwords.includes(phrases[j])){  
                      let index = usefulwords.indexOf(phrases[j]);
                      usefulwords.splice(index,1);
                    }  
              }
            }
          }
        }
    return usefulwords;
    }

}
export default Main;