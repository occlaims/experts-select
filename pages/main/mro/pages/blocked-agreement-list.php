

<?php 

//START - TURN ERRORS ON
/*ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(-1);*/
//END - TURN ERRORS ON

$getCompanyNo = $conn->execute_sql("select", array("ma_name"), "m_accounts", "ma_id=?", array("i" => $_SESSION['CME_USER']['login_id']));

//var_dump($confirmedAgreement);

$confirmedExpert = $conn->execute_sql("select", array("*"), "organisation_agreements JOIN e_accounts ON oa_ea_name = ea_id AND oa_mo_name = '".$getCompanyNo[0]['ma_name']."' AND oa_confirmed = 4", "", "");


?>
<table class="tg table midd">
  <tr><!-- Top row -->
    <th class="tg-031e midd"><b>Name</b></th>
    <th class="tg-031e midd"><b>ID</b></th>
    <th class="tg-031e midd"><b>Phone</b></th>
    <th class="tg-031e midd"><b>Email</b></th>
    <th class="tg-031e midd"><b>Notes</b></th>  
    <th class="tg-031e midd"><b>Actions</b></th>
  </tr>
   
<?php 
if($getCompanyNo) {
	foreach($confirmedExpert as $header => $value) { ?>
      <tr>
        <td class="tg-031e"><?php echo $confirmedExpert[$header]['ea_forename'] . " " . $confirmedExpert[$header]['ea_surname']; ?></td>
        <td class="tg-031e"><?php echo $confirmedExpert[$header]['ea_id']; ?></td>
        <td class="tg-031e"><?php echo $confirmedExpert[$header]['ea_telephone']; ?></td>
        <td class="tg-031e"><a href="mailto:<?php echo $confirmedExpert[$header]['ea_email']; ?>"><?php echo $confirmedExpert[$header]['ea_email']; ?></a></td>
        <td class="tg-031e">
			<?php echo $confirmedExpert[$header]['oa_blocked_note']; ?>
        </td>
        <td class="tg-031e">
            <a href = "#" id = "mro-view-past-agreement:<?php echo $confirmedExpert[$header]['oa_id']; ?>" class = "show-overlay btn btn-default btn-sm" title="View Agreement"><i class="fa fa-lg fa-file-text-o"></i></a>
            <a href = "#" id = "mro-unblock-expert:<?php echo $confirmedExpert[$header]['oa_id']; ?>" class = "show-overlay btn btn-default btn-sm" title="Unblock"><i class="fa fa-lg fa-user-plus"></i></a>

        </td>
      </tr>
<?php } }?>

</table>