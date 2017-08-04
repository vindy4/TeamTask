import React from 'react';
import FaEdit from 'react-icons/lib/md/edit';
import MdDone from  'react-icons/lib/md/done';
import EditPendingForm from  './EditPendingForm';
import NewToCloseForm from './NewToCloseForm';


function EditForm(props){
    
    if(props.index === -1 ){
        return null;    
    }
    else
        return(
             <EditPendingForm 
                title={props.items[props.index].title} 
                task={props.items[props.index].task}
                assTo={props.items[props.index].assTo}
                reason={props.items[props.index].reason}
                EditPendingItem={props.EditPendingItem}
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


class PendingItem extends React.Component{ 
    
    constructor(props){
        super(props);
        
         this.state = {
            editFlag:-1,            
            closeFlag:-1
        }
         
        this.editIndex=this.editIndex.bind(this);
        this.closeModalForm=this.closeModalForm.bind(this);
        this.EditPendingItem=this.EditPendingItem.bind(this);
        this.closeIndex=this.closeIndex.bind(this);
        this.PendingToClose=this.PendingToClose.bind(this);
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
            editFlag:index
        })
    }//   editindex ends here
    
    
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
            editFlag:-1,
            closeFlag:-1           
        })
    }
    
    EditPendingItem(obj){
        this.props.editPending(obj,this.state.editFlag);
        document.getElementById('closeEditPendingForm').click();
        this.setState({
            editFlag:-1
        }) 
    }
    
    PendingToClose(obj){
      //  console.log(obj,this.state.closeFlag);
        this.props.pendingToClose(obj,this.state.closeFlag);
        document.getElementById('closePendingCloseForm').click();
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
                          </div>
                          <ul className="list-group list-group-flush">
                              { this.props.itemList.map( (item,i) =>                         
                                <li  key={i} className="list-group-item blue"> {i+1}.  
                                      &nbsp;    {item.title.toUpperCase()} <br />
                                    <p>{item.task}
                                        <br /><br />
                                        <span className="assigned-to"> 
                                            Assigned to :
                                        </span>

                                        <cite title="Source Title">
                                            &nbsp;{item.assTo}
                                        </cite> 
                                        <br />
                                        <span className="pending-reason">
                                           Pending reason :</span> {item.reason}   
                                    </p>

                                    <footer>
                                        <button 
                                           className="btn btn-default pending-edit" 
                                           title="edit"
                                           data-toggle="modal"
                                           data-target="#EditPendingTaskModal"
                                           value={i}
                                           onClick={this.editIndex}       
                                        >
                                           <FaEdit /> 
                                        </button> &nbsp;
                                           
                                        <button
                                           className="btn btn-default pending-btn" 
                                           title="close"
                                           data-toggle="modal"
                                           data-target="#PendingToCloseTaskModal"
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
           {/*   Pending items card ends here   */}

                  {/* start of pending new task form*/}        
              <div className="modal fade" id="EditPendingTaskModal" role="dialog">
                <div className="modal-dialog">              
                  <div className="modal-content">
                    <div className="modal-header">
                      <button type="button"
                          className="close" 
                          data-dismiss="modal" 
                          id="closeEditPendingForm"
                          onClick={this.closeModalForm}
                              >&times;</button>
                      <h4 className="modal-title">Edit Pending Task</h4>
                    </div>
                    <div className="modal-body">                                                                                     
                       <EditForm  
                        index={this.state.editFlag}
                        items={items}
                        EditPendingItem={this.EditPendingItem}
                        closeModalForm={this.closeModalForm}
                        /> 
                    </div>               
                  </div>
                </div>
              </div>  
                {/* end of edit pending task form*/}            
                          
                       {/* start of  pending  to close task form*/}        
              <div className="modal fade" id="PendingToCloseTaskModal" role="dialog">
                <div className="modal-dialog">              
                  <div className="modal-content">
                    <div className="modal-header">
                      <button type="button"
                          className="close" 
                          data-dismiss="modal" 
                          id="closePendingCloseForm"
                          onClick={this.closeModalForm}
                              >&times;</button>
                      <h4 className="modal-title">Close Task</h4>
                    </div>
                    <div className="modal-body">                                                                                     
                       <NewClose  
                        index={this.state.closeFlag}
                        items={items}                        
                        closeModalForm={this.closeModalForm}
                        newToClose={this.PendingToClose}
                        /> 
                    </div>               
                  </div>
                </div>
              </div>  
                {/* end of  pending  to close task form*/}               
                          
            </div>
        );
    }
}  //  Pending item class ends here


export default PendingItem;