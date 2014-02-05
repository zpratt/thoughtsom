Feature: As a user, I want to be able to create thoughts through the REST api

  Scenario: Thought created by POST to /thought
    Given No thoughts exist
    When A POST to /thought is performed
    Then A thought is persisted

  Scenario: Lookup a thought
    Given A thought exists in the database
    When A GET is /thought/:id is performed
    Then A thought is returned