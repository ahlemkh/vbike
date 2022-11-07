<?php
session_start();
if( isset($_SESSION['admin_id']) && isset($_SESSION['admin_full_name']))
{
    echo $_SESSION['admin_full_name'];
}
else{ echo "not connected";}