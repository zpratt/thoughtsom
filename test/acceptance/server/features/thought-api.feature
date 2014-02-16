Feature: As a user, I want to be able to create thoughts through the REST api

  Scenario: Lookup a thought

    Given A thought exists in the database
    When A GET on /thought with "52ffef5e3242c4a82909c53f" is performed
    Then A thought is returned