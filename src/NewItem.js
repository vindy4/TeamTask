import React from 'react';
import FaEdit from 'react-icons/lib/md/edit';
import FaPlusCircle from 'react-icons/lib/fa/plus-circle';
import MdDone from  'react-icons/lib/md/done';
import MdHourglassFull from 'react-icons/lib/md/hourglass-full';
import EditNewForm from './EditNewForm';
import NewToPendingForm from './NewToPendingForm';
import NewToCloseForm from './NewToCloseForm';

function EditForm(props){
      
    if(props.index === -1 ){
        return null;    
    }
    else
        return(
             <EditNewForm 
                title={props.items[props.index].title} 
                task={props.items[props.index].task}
                assTo={props.items[props.index].assTo}
                EditNewItem={props.EditNewItem}
                closeModalForm={props.closeModalForm}
              />
        );                      
}


function NewPending(props){    
      
    if(props.index === -1 ){
        return null;    
    }
    else
        return(
             <NewToPendingForm 
                title={props.items[props.index].title} 
                task={props.items[props.index].task}
                assTo={props.items[props.index].assTo}
                newToPending={props.newToPending}
                closeModalForm={props.closeModalForm}
              />
        );                      
}

function NewClose(props){
    
      if(props.index === -1 ){
        return null;    
    }
    else
        return(
             <NewToCloseForm 
                title={props.items[props.index].title} 
                task={props.items[props.index].task}
                assTo={props.items[props.index].assTo}
                newToClose={props.newToClose}
                closeModalForm={props.closeModalForm}
              />
        );  
    
}


class NewItem extends React.Component{ 
    
    constructor(props){
        super(props);
        this.addnewItem=this.addnewItem.bind(this);
        this.editIndex=this.editIndex.bind(this);
        this.EditNewItem=this.EditNewItem.bind(this);
        this.closeModalForm=this.closeModalForm.bind(this);
        this.pendingIndex=this.pendingIndex.bind(this);
        this.newToPending=this.newToPending.bind(this);
        this.closeIndex=this.closeIndex.bind(this);
        this.newToClose=this.newToClose.bind(this);
        
        this.state = {
            value:-1,
            pendingFlag:-1,
            closeFlag:-1
        }
    }    
    
    addnewItem(event){
        
       this.props.addNew(event);
    }
    
    editIndex(e){           
        
        var index=-1;
        if(e.target.nodeName === "svg"){           
             index= parseInt(e.target.parentElement.value,10);
        }
        else if(e.target.nodeName === "path"){         
             index=parseInt(e.target.parentElement.parentElement.parentElement.value,10);
        }
        else{         
             index=parseInt(e.target.value,10);
        }
                 
        this.setState({
            value:index
        })
    }//   editindex ends here
    
    pendingIndex(e){           
        
        var index=-1;
        if(e.target.nodeName === "svg"){           
             index= parseInt(e.target.parentElement.value,10);
        }
        else if(e.target.nodeName === "path"){         
             index=parseInt(e.target.parentElement.parentElement.parentElement.value,10);
        }
        else{         
             index=parseInt(e.target.value,10);
        }     
           
        this.setState({
            pendingFlag:index
        })
    } //  pending flag function ends here
    
    
    closeIndex(e){
          var index=-1;
        if(e.target.nodeName === "svg"){           
             index= parseInt(e.target.parentElement.value,10);
        }
        else if(e.target.nodeName === "path"){         
             index=parseInt(e.target.parentElement.parentElement.parentElement.value,10);
        }
        else{         
             index=parseInt(e.target.value,10);
        }     
           
        this.setState({
            closeFlag:index
        })
        
    }//  close index ends here
    
    
    closeModalForm(){
         this.setState({
            value:-1,
            pendingFlag:-1,
            closeFlag:-1
        })
    }
    
    //   sending data to App to edit the item in the state
    EditNewItem(obj){             
        this.props.editNew(obj,this.state.value);    
        document.getElementById('closeEditNewForm').click();
        this.setState({
            value:-1
        })        
    }
    
    // sending data to the app for adding this to pending and removing from the new state
    newToPending(obj){         
       this.props.newToPending(obj,this.state.pendingFlag);    
       document.getElementById('closeNewPendingForm').click();
        this.setState({
            pendingFlag:-1
        }) 
    }
    
   // 
    newToClose(obj){
        this.props.newToClose(obj,this.state.closeFlag);
        document.getElementById('closeNewCloseForm').click();
        this.setState({
            closeFlag:-1
        }) 
    }
    
    render(){
        
        const items=this.props.itemList;      
        return(
         <div>
            <div className="col col-lg-4 col-sm-4">
                     <div className="card">
                          <div className="card-header">
                             <h3  className="task-heading">{this.props.heading}</h3>
                             <button
                                 className="btn add"
                                 data-toggle="modal"
                                 data-target="#AddNewTaskModal" >                                 
                                <FaPlusCircle size={25}/>
                             </button>
                          </div>
                          <ul className="list-group list-group-flush">
                              { this.props.itemList.map( (obj,i) =>                         
                                 
                                 <li  className="list-group-item red"  key={i}> 
                                        {i+1} . &nbsp;  {(obj.title).toUpperCase()}   <br /> 
                                          <p> {obj.task}</p>

                                         <span className="assigned-to">Assigned to :</span>   <cite title="Source Title">{obj.assTo}</cite>                                          


                                         <footer>
                                             <button className="btn btn-default new-edit"      
                                                title="edit"
                                                data-toggle="modal"
                                                data-target="#EditNewTaskModal"
                                                value={i}
                                                onClick={this.editIndex}
                                              >
                                                <FaEdit/>
                                              </button>&nbsp;

                                              <button 
                                                  className="btn btn-default new-default"
                                                  title="pending"
                                                  data-toggle="modal"
                                                  data-target="#NewToPendingTaskModal"
                                                  value={i}
                                                  onClick={this.pendingIndex}
                                              >
                                                      
                                                  <MdHourglassFull />
                                              </button>&nbsp;

                                              <button 
                                                  className="btn btn-default new-default"
                                                  title="close"
                                                  data-toggle="modal"
                                                  data-target="#NewToCloseTaskModal"
                                                  value={i}
                                                  onClick={this.closeIndex}
                                              >
                                                  <MdDone /> 
                                              </button>
                                         </footer>                                
                                 </li>
                                
                              )}

                          </ul>
                    </div>

                </div>
                          
             {/* start of edit new task form*/}        
              <div className="modal fade" id="EditNewTaskModal" role="dialog">
                <div className="modal-dialog">              
                  <div className="modal-content">
                    <div className="modal-header">
                      <button type="button"
                          className="close" 
                          data-dismiss="modal" 
                          id="closeEditNewForm"
                          onClick={this.closeModalForm}
                              >&times;</button>
                      <h4 className="modal-title">Edit New Task</h4>
                    </div>
                    <div className="modal-body">                                                                                     
                       <EditForm  
                        index={this.state.value}
                        items={items}
                        EditNewItem={this.EditNewItem}
                        closeModalForm={this.closeModalForm}
                        /> 
                    </div>               
                  </div>
                </div>
              </div>  
                {/* end of edit new task form*/} 

                {/* start of  new  to pending task form*/}        
              <div className="modal fade" id="NewToPendingTaskModal" role="dialog">
                <div className="modal-dialog">              
                  <div className="modal-content">
                    <div className="modal-header">
                      <button type="button"
                          className="close" 
                          data-dismiss="modal" 
                          id="closeNewPendingForm"
                          onClick={this.closeModalForm}
                              >&times;</button>
                      <h4 className="modal-title">Pending Task</h4>
                    </div>
                    <div className="modal-body">                                                                                     
                       <NewPending  
                        index={this.state.pendingFlag}
                        items={items}                        
                        closeModalForm={this.closeModalForm}
                        newToPending={this.newToPending}
                        /> 
                    </div>               
                  </div>
                </div>
              </div>  
                {/* end of  new  to pending task form*/}        


                    {/* start of  new  to close task form*/}        
              <div className="modal fade" id="NewToCloseTaskModal" role="dialog">
                <div className="modal-dialog">              
                  <div className="modal-content">
                    <div className="modal-header">
                      <button type="button"
                          className="close" 
                          data-dismiss="modal" 
                          id="closeNewCloseForm"
                          onClick={this.closeModalForm}
                              >&times;</button>
                      <h4 className="modal-title">Close Task</h4>
                    </div>
                    <div className="modal-body">                                                                                     
                       <NewClose  
                        index={this.state.closeFlag}
                        items={items}                        
                        closeModalForm={this.closeModalForm}
                        newToClose={this.newToClose}
                        /> 
                    </div>               
                  </div>
                </div>
              </div>  
                {/* end of  new  to close task form*/}      
    
         </div>
        );
    }
}  //  Newitem class ends here


export default NewItem;


