import pytest


def test_smoke(acct1, acct2, acct3, contract_billboard):
    assert acct1.balance > 0
    assert acct2.balance > 0
    assert acct3.balance > 0
    assert contract_billboard.getMessage() == "gm"


def test_set_message(acct2, contract_billboard):
    assert contract_billboard.getMessage() == "gm"
    contract_billboard.setMessage("gn", sender=acct2)
    assert contract_billboard.getMessage() == "gn"
