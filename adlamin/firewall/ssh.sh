#!/bin/bash

source $ADLAMIN_HOME/firewall/iptables.sh

enable_ssh_client(){

    enable_client tcp 22
}

disable_ssh_client(){

    disable_client tcp 22
}
