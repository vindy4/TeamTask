import React from 'react';


class NewToCloseForm extends React.Component{
    
     constructor(props){
       super(props);
       
       this.state ={
           title:this.props.title,
           task :this.props.task,
           assTo:this.props.assTo,
           resolution:''
       }
       
      this.handleNameChange=this.handleNameChange.bind(this);
      this.handleTaskChange=this.handleTaskChange.bind(this);
      this.handleAssignChange=this.handleAssignChange.bind(this);
      this.handleResolution=this.handleResolution.bind(this);      
      this.handleSubmit=this.handleSubmit.bind(this);     
      this.close=this.close.bind(this);
   }
    
    handleResolution(e){
        this.setState({
            resolution:e.target.value
        }) 
    }
 
    close(){
        this.props.closeModalForm();
    }
    
    handleNameChange(e){
        this.setState({
            title:e.target.value
        })
    }
    
    handleTaskChange(e){
        this.setState({
            task:e.target.value
        })
    }
    
    handleAssignChange(e){        
        this.setState({
            assTo:e.target.value
        })
    }
    
    handleSubmit(event){               
          
       this.props.newToClose(this.state);                                   
   //    this.setState({});
       event.preventDefault();          
    }
    
    render(){
         const {title,task,assTo,resolution} =this.state;
         const isEnabled = ( (title.length >0) && (task.length)>0 && (assTo.length)> 0 &&(resolution.length)> 0 )? true:false;
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
                     <textarea 
                        className="form-control"  
                        value={this.state.reason}
                        onChange={this.handleResolution}
                        placeholder="Add  resolution"  
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
                  <button onClick={this.close} type="button"
                      className="btn btn-warning" 
                      data-dismiss="modal">Close</button>
            </div>
                    
            </form>
            
      </div>
                
        
        );
    }
    
}

export default NewToCloseForm;