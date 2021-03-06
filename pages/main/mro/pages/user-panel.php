<!-- USER DETAILS MODAL -->
<div id="overlay" style = "margin-top:300px" >
    <div id="overlay-content" class="ro">
        <div id="close" style="background-color:#337AB7"><button type="button" class="close" ><p>Close <i class = "fa fa-lg fa-times"></i></p></button></div>
            <div id="overlay-title">
            	<h3>User Details</h3>
            </div>
            
            <div id="overlay-text">
            	
            </div>
            
            <div style="clear: both;"></div>
    </div>
    <div style="clear: both;"></div>
</div>

<!-- Very broken and probably never to be used help modal:
    <a href = "#" id = "help-modal" class = "show-overlay btn btn-default btn-sm" title="Help">
        <i class="fa fa-lg fa-info"></i>
    </a>
-->

<!-- USER MANAGEMENT PANEL FOR MRO -->
<div class= "container main">   
    <div class="col-md-12 mb25">              
        <h3>User Panel</h3><div class="title-divider"></div>
    </div> 

    
    <div class="col-lg-12"> 
        <div class="panel panel-default">
          <div class="panel-heading"><h4>Staff Page</h4></div>
          <div class="panel-body">
         <div class="col-lg-6"> 
        
         
             <p>
             This page allows you to manage your staff user profiles within your organization. Get started by
             clicking 'create user' and filling in the details on the table below. The 'actions' column
             will allow you to edit staff notes, change their details and account settings and remove the
             account if it is no longer required. The 'set defaults' button will let you choose the
             default permission and 'in use settings' for each time you create a new user.
             </p>
             
             <button id = "add-user" class = "btn btn-default mt25">Create User <i class="fa fa-user-plus"></i> </button>
             <!-- Removed these extra features for now
              <span class = "btn btn-primary">View Statistics <i class="fa fa-database"></i> </span>
              <span class = "btn btn-primary">Set Defaults <i class="fa fa-cog"></i> </span>
             -->
        </div>
        
            <div class="col-lg-6">
                <ul class="fa-ul mb25">
                    <li><i class="fa fa-li fa-lg fa-pencil"></i> <p>View and edit user details.</p></li>
                    <li><i class="fa fa-li fa-user-times "></i> <p>Delete the account.</p></li>
                </ul>
            </div>

        <form id="createNewMro" method="post" action="">
              <div class = "add-user-form col-md-12 mt10" style = "display:none;"><!-- Form -->
                <div class = "col-md-6">
                
                
                    <label class = "controls">First Name:</label>
                    <input name = "Vname" class = "form-control" autocomplete = "off" value="" />

                    <label class = "controls">Surname:</label>
					<input name = "Vname2" class = "form-control" autocomplete = "off" value=""  />
                    
                    <label class = "controls">Password:</label>
					<input name="Vpassword" class = "form-control" autocomplete = "off" value=""  />
                    
                    
                </div>
                
                <div class = "col-md-6">
                    <label class = "controls">Email Address:</label>
                    <input class = "form-control" name="emailAddress"/>
                    
                    <label class = "controls">User Level:</label>
                    <select id="setPermissions" name="setPermissions" class = "form-control">
                        <option name="1" value="1" >Basic user</option>
                        <option name="2" value="2" >Advanced user</option>
                        <option name="3" value="3" >Administrator user</option>
                        
                        <!--
                        
                        	User ideas:
                            Basic - Can perform extremely basic functions, can't edit or delete
                            Advanced - Can do more than basic but is still limited in functions
                            Admin - Can add, edit and delete, full access except for account creation?
                            Master - Full access, can create and delete other users
                            
                        -->
                        
                    </select>
                    

                    <label class = "controls">Active:</label>
                    <select id="userActiveStatus" name="userActiveStatus" class = "form-control">
                        <option name="Y" value="Y">Yes</option>
                        <option name="N" value="N">No</option>
                    </select>
                    
                </div>
                
                <div class = "col-md-12">
                	<input type="submit" id="createUser" class="btn btn-lg btn-primary col-md-4 mt25" value="Create" />
                </div>
                
                </form>
                
                <div id="success"></div>
        

      </div>
      

      </div>    
     </div>

    </div>
    
    <?php
		$mroDetails = $conn->execute_sql("select", array("*"), "m_accounts JOIN m_organisations on ma_name = mo_id", "ma_id =?", array("i" => $_SESSION['CME_USER']['login_id']));
		$user = $mroDetails[0]['mo_name'];
	?>

<div class = "col-md-12 mt25"> <!-- Change this to change width of table -->   
	<div class="row"><div class="col-md-3 blue topradius pq"><h4 class ="midd textwhite"><i class="fa fa-user"></i> <?php echo $user; ?> Staff</h4></div>
        <div class="col-md-12 blue diaryradius mb50 pt25 pb25">

			<?php include("list-mro-users.php"); ?>

        </div>  <!-- End of table thing -->
	</div>
</div>

<div class = "col-md-12 mt25"> <!-- Change this to change width of table -->   
	<div class="row"><div class="col-md-3 blue topradius pq"><h4 class ="midd textwhite"><i class="fa fa-user"></i> Inactive Staff</h4></div>
        <div class="col-md-12 blue diaryradius mb50 pt25 pb25">

			<?php include("list-inactive-users.php"); ?>

        </div>  <!-- End of table thing -->
	</div>
</div>


</div>

