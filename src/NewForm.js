import React from 'react';


class  NewForm extends React.Component{
    
    
    constructor(props){
        super(props);
        
        this.state={
          title:'',
          task:'',
          assTo:''
        };
        
        this.handleSubmit=this.handleSubmit.bind(this);       
        this.handleNameChange=this.handleNameChange.bind(this);
        this.handleTaskChange=this.handleTaskChange.bind(this);
        this.handleAssignChange=this.handleAssignChange.bind(this);
        
    }
    
    handleNameChange(event){
        this.setState({
           title:event.target.value 
        });        
        
    }
   
    handleTaskChange(event){
          this.setState({
           task:event.target.value
        });   
        
    }
    
    handleAssignChange(event){
        this.setState({
           assTo:event.target.value
        });   
          
    }
    
    
    handleSubmit(event){               
                  
         this.props.addTask(this.state);       
         this.setState({
          title:'',
          task:'',
          assTo:''
        });
        event.preventDefault();
    }
    
    render(){        
        
        const {title,task,assTo} =this.state;
        const isEnabled= ( (title.length>0) && (task.length>0)&& (assTo.length>0) )?true:false ;
        
       
        return(            
          <div>                                    
            <form className="form-group" onSubmit={this.handleSubmit}>          
            
                    <input 
                        className="form-control"
                        onChange={this.handleNameChange}
                        placeholder="New task title.."
                        type="text"
                        value={this.state.title}
                     />   <br />   
             
                    <textarea 
                        className="form-control"  
                        value={this.state.task}
                        onChange={this.handleTaskChange}
                        placeholder="New task information.."  
                        rows="3">
                    </textarea>  <br />
            
                    <select 
                           className="form-control"
                           value={this.state.assTo} 
                           onChange={this.handleAssignChange} >
                           
                      <option value="none">Assigned to </option>
                      <option value="vinay">Vinay</option>
                      <option value="Disha" >Disha</option>
                      <option value="Hari">Hari</option>   
            
                    </select> <br />   
             <div className="modal-footer">
             <button  disabled={!isEnabled} type="submit" className="btn btn-primary left-submit-button" >Submit</button>                   
                  <button type="button" className="btn btn-warning" data-dismiss="modal">Close</button>
            </div>
                    
            </form>
            
      </div>
        );    
    }
} ///  New form component ends here


export default NewForm;