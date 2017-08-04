import React from 'react';
import FaEdit from 'react-icons/lib/md/edit';
import EditClosedForm  from './EditClosedForm'

function EditForm(props){
    
    if(props.index === -1 ){
        return null;    
    }
    else
        return(
             <EditClosedForm 
                title={props.items[props.index].title} 
                task={props.items[props.index].task}
                assTo={props.items[props.index].assTo}
                resolution={props.items[props.index].resolution}
                EditPendingItem={props.EditPendingItem}
                closeModalForm={props.closeModalForm}
              />
        );                      
}


class ClosedItem extends React.Component{ 
    
    constructor(props){
        super(props);
        this.state={
            editFlag:-1
        }
        
        this.closeModalForm=this.closeModalForm.bind(this);
        this.editIndex=this.editIndex.bind(this);
        this.EditClosedItem=this.EditClosedItem.bind(this);
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
       
    closeModalForm(){
         this.setState({
            editFlag:-1,
            closeFlag:-1           
        })
    }
    
    EditClosedItem(obj){
        this.props.editClosed(obj,this.state.editFlag);              
        document.getElementById('closeEditClosedForm').click();
        this.setState({
            editFlag:-1
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
                            <li  key={i} className="list-group-item green"> {i}. {item.title}    
                                <p> {item.task}                               
                                     <br /><br />
                                    <span className="assigned-to">   
                                         Assigned to:
                                    </span> <cite title="Source Title">{item.assTo}</cite>
                                        <br />
                                   <span  className="pending-reason"> Resolution :</span> {item.resolution}              
        
                                </p>    
                                <footer> 
                                  <button 
                                      className="btn btn-default close-edit"
                                      title="edit"
                                      data-toggle="modal"
                                      data-target="#EditClosedTaskModal"
                                      value={i}
                                      onClick={this.editIndex}
                                  >
                                    <FaEdit /> 
                                  </button>                                                              
                                 </footer>        
                                     
                            </li>                                                      
                          )}

                      </ul>
                </div>
            </div>
            {/* closed item card ends here  */}
                           {/* start of pending new task form*/}        
              <div className="modal fade" id="EditClosedTaskModal" role="dialog">
                <div className="modal-dialog">              
                  <div className="modal-content">
                    <div className="modal-header">
                      <button type="button"
                          className="close" 
                          data-dismiss="modal" 
                          id="closeEditClosedForm"
                          onClick={this.closeModalForm}
                              >&times;</button>
                      <h4 className="modal-title">Edit New Task</h4>
                    </div>
                    <div className="modal-body">                                                                                     
                       <EditForm  
                        index={this.state.editFlag}
                        items={items}
                        EditPendingItem={this.EditClosedItem}
                        closeModalForm={this.closeModalForm}
                        /> 
                    </div>               
                  </div>
                </div>
              </div>  
                {/* end of edit pending task form*/}            
                      
        </div>              
        );
    }
}  //  Closed Item class ends here


export default ClosedItem;
