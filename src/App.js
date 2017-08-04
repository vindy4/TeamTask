import React, { Component } from 'react';
import './App.css';
import NewForm from './NewForm';
import NewItem from './NewItem';
import ClosedItem from './ClosedItem';
import PendingItem from './PendingItem';
import InitialState from './InitialState.json'




class App extends Component {
    
   constructor(props){
       super(props);      
        
       this.state= InitialState;  //  setting initial state from JSON file
      
      //  bindig all the function inside the class               
       this.addNewTask=this.addNewTask.bind(this);
       this.editNewForm=this.editNewForm.bind(this);   
       this.newToPendingMove=this.newToPendingMove.bind(this);
       this.newToCloseMove=this.newToCloseMove.bind(this);
       this.editPending=this.editPending.bind(this);
       this.pendingToCloseMove=this.pendingToCloseMove.bind(this);
       this.editClosed=this.editClosed.bind(this);
    }//  constructor ends here
    

     addNewTask(obj){         
            this.setState( (prevState) => ({
              new: prevState.new.concat(obj)
          }))
            
    ///  this is just a temporary part to close the Modal as I am not sending the data to Server as of now.        
      document.getElementById('closeAddForm').click();
     }
    
    //  this function will channge the new item value when we edit it in the form
    editNewForm(obj,index){    
        let newState= this.state.new;
        newState[index]=obj;    
        this.setState({
            new:newState
        })
        
    }
    
    newToPendingMove(obj,index){        
        
        this.setState( (prevState) => ({
            pending: prevState.pending.concat(obj)
        }))
        
        const newstate  = this.state.new.filter( (item,i) => (i!== index) );
        this.setState({
            new:newstate
        })  
        
    }
    
    newToCloseMove(obj,index){
                
        this.setState( (prevState) => ({
            closed: prevState.closed.concat(obj)
        }))
        
          const newstate  = this.state.new.filter( (item,i) => (i!== index) );
        this.setState({
            new:newstate
        })  
    }
    
    editPending(obj,index){
        
       
        let pendingState=this.state.pending;
        pendingState[index]=obj;
        
        this.setState({
            pending:pendingState
        })
    }
    
    pendingToCloseMove(obj,index){             
     
        this.setState( (prevState) => ({
            closed: prevState.closed.concat(obj)
        }))
        
        const pendingState  = this.state.pending.filter( (item,i) => (i!== index) );
        this.setState({
            pending:pendingState
        })    
    }
    
    editClosed(obj,index){
        let closedState=this.state.closed;
        closedState[index]=obj;
        
        this.setState({
            closed:closedState
        })
        
        
    }
    
    
  render() {
     
     var db = openDatabase('TeamTaskDB', '1.0', 'Database for team task app', 5 * 1024 * 1024);
        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS NewItem (id unique,title,task,assTo)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS Pendingtem (id unique,title,task,assTo,reason)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS Closedtem (id unique,title,task,assTo,resolution)');
         });

    return (
        
      <div className="container"> 
        <div className="row">       
        
          <div  className="col-12  header">
             <h2>Task list</h2>
          </div>
        
          {/* start of Add new task form*/}        
          <div className="modal fade" id="AddNewTaskModal" role="dialog">
            <div className="modal-dialog">              
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" id="closeAddForm">&times;</button>
                  <h4 className="modal-title">Add New Task</h4>
                </div>
                <div className="modal-body">
                   <NewForm                           
                      addTask={this.addNewTask}
                   />
                </div>               
              </div>
            </div>
          </div>  
            {/* end of Add new task form*/}              
        
        
           <NewItem  
                heading={"New items"}
                itemList={this.state.new} 
                addNew={this.openAddForm} 
                editNew={this.editNewForm}
                newToPending={this.newToPendingMove}
                newToClose={this.newToCloseMove}
           />              
        
          <PendingItem  
               heading={"Pending items"} 
               itemList={this.state.pending}
               editPending={this.editPending}
               pendingToClose={this.pendingToCloseMove}
          />   
        
          <ClosedItem 
               heading={"Closed items"} 
               itemList={this.state.closed}
               editClosed={this.editClosed}
          />                  
        
        </div>
        
      </div>
    );
  }
}//  App component ends here



export default App;
